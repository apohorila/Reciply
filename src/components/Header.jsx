import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  return (
    <>
      <nav className="flex h-18 w-full items-center justify-between bg-[#F85E00] px-16">
        <div className="flex space-x-8 font-[Stolzl] font-medium text-[#FFD29D]">
          <NavLink to="/">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/planner">Planner</NavLink>
        </div>
        <NavLink to="/">
          <img src="/logo.png" alt="Reciply logo" />
        </NavLink>
        <div className="flex space-x-4">
          <button
            className="cursor-pointer rounded-full border px-5 py-2 font-[Stolzl] text-[#FFD29D] transition delay-50 duration-200 hover:bg-[#FFD29D] hover:text-[#FF4848]"
            onClick={currentUser ? logout : () => navigate("/login")}
          >
            {currentUser ? "Log out" : "Sign in"}
          </button>
        </div>
      </nav>
    </>
  );
}
