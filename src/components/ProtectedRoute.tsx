import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user || user.isAnonymous) {
    return <Navigate to="/signin" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
