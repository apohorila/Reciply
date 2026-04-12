import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
    const {currentUser} = useAuth()
    return (
        currentUser? <Outlet/> : <Navigate to={"/login"}/>
    )

}