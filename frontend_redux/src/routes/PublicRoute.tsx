// routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken"); // Kiểm tra nếu người dùng đã đăng nhập

  if (isAuthenticated) {
    return <Navigate to="/home" />; // Nếu đã đăng nhập, chuyển tới trang home
  }

  return <Outlet />; // Nếu chưa đăng nhập, cho phép truy cập vào trang login
};

export default PublicRoute;
