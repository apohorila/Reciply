import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  return (
    <>
      <nav className="flex h-16 w-full items-center justify-between bg-[#F85E00] px-4 md:h-18 md:px-16">
        <div className="flex space-x-4 font-[Stolzl] text-sm font-medium text-[#FFD29D] md:space-x-8 md:text-base">
          <NavLink to="/">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/planner">Planner</NavLink>
        </div>
        <NavLink to="/">
          <img
            src="/logo.png"
            alt="Reciply logo"
            className="h-8 w-auto md:h-10"
          />
        </NavLink>
        <div className="flex space-x-4">
          <button
            className="cursor-pointer rounded-full border px-3 py-1.5 font-[Stolzl] text-xs text-[#FFD29D] transition delay-50 duration-200 hover:bg-[#FFD29D] hover:text-[#FF4848] md:px-5 md:py-2 md:text-base"
            onClick={currentUser ? logout : () => navigate("/login")}
          >
            {currentUser ? "Log out" : "Sign in"}
          </button>
        </div>
      </nav>
    </>
  );
}
