// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken"); // hoặc kiểm tra với một state nào đó

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Nếu không có accessToken, chuyển đến trang login
  }

  return <Outlet />; // Hiển thị các route con nếu đã đăng nhập
};

export default ProtectedRoute;
