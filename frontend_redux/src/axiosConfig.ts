import axios from "axios";

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Đổi thành URL API của bạn
  timeout: 10000, // Timeout 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Thêm Access Token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Lấy Access Token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm Authorization header
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi trước khi gửi request
    return Promise.reject(error);
  }
);

// Response Interceptor: Xử lý lỗi hoặc refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu trả về (nếu cần)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã retry
      try {
        // Gọi API Refresh Token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://localhost:4000//auth/refresh",
          {
            token: refreshToken,
          }
        );

        // Lưu Access Token mới
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Gắn Access Token mới vào header của request gốc
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Gửi lại request gốc
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Xử lý khi Refresh Token không hợp lệ
        console.error("Refresh Token failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Chuyển hướng về trang login
      }
    }

    // Trả về lỗi nếu không phải lỗi 401
    return Promise.reject(error);
  }
);

export default axiosInstance;
