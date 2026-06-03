import { Navigate, Outlet, useLocation } from "react-router";

export function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "null" && token !== "undefined" && token !== "";
  const location = useLocation();

  if (!isAuthenticated) {
    if (token) {
      localStorage.removeItem("token");
    }
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}
