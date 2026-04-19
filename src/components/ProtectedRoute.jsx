import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" />;
  return <Outlet />;
};
