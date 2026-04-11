import { NavLink } from "react-router";

export default function Header() {
  return (
    <>
      <nav className="flex h-18 w-full items-center bg-[#F85E00] px-16 justify-between">
        <div className="flex space-x-8 font-[Stolzl] font-medium text-[#FFD29D]">
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/planner">Planner</NavLink>
        </div>
        <img src="/logo.png" alt="Reciply logo" />
        <div className="flex space-x-4">
          <button className="rounded-full border px-5 py-2 font-[Stolzl] text-[#FFD29D] cursor-pointer transition delay-50 duration-200  hover:bg-[#FFD29D] hover:text-[#FF4848]">
            Sign in
          </button>
        </div>
      </nav>
    </>
  );
}
