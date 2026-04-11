import { NavLink } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
export default function Footer() {
  const currYear = new Date().getFullYear();
  return (
    <>
      <footer className="flex-col space-y-4 bg-[#F85E00] pb-5">
        <div className="flex h-18 w-full items-center justify-between px-16">
          <img src="/logo.png" alt="Reciply logo" />
          <div className="flex space-x-8 font-[Stolzl] font-medium text-[#FFD29D]">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/planner">Meal planner</NavLink>
          </div>
        </div>
        <div className="flex justify-between px-16">
          <div className="flex space-x-4">
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              className="rounded-4xl border border-[#FFD29D] px-2 py-1.5 font-[Stolzl] text-xs text-[#FFD29D]"
            >
              Powered by TheMealDB
            </a>
            <a href="https://github.com/apohorila" target="_blank">
              <FaGithub className="h-7 w-7 text-[#FFD29D]" />
            </a>
            <a
              href="https://www.linkedin.com/in/anna-pohorila-45133b314/"
              target="_blank"
            >
              <FaLinkedin className="h-7 w-7 text-[#FFD29D]" />
            </a>
          </div>
          <p className="font-[Stolzl] text-[#FFD29D]">© Reciply {currYear}</p>
        </div>
      </footer>
    </>
  );
}
