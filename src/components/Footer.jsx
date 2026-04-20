import { NavLink } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
export default function Footer() {
  const currYear = new Date().getFullYear();
  return (
    <>
      <footer className="flex-col space-y-4 bg-[#F85E00] pb-5">
        <div className="flex h-auto w-full flex-col items-center justify-between px-4 py-4 md:h-18 md:flex-row md:px-16 md:py-0">
          <img
            src="/logo.png"
            alt="Reciply logo"
            className="mb-4 h-10 w-auto md:mb-0"
          />
          <div className="flex space-x-4 font-[Stolzl] text-sm font-medium text-[#FFD29D] md:space-x-8 md:text-base">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/planner">Meal planner</NavLink>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0 md:px-16">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              className="rounded-4xl border border-[#FFD29D] px-3 py-1.5 font-[Stolzl] text-xs text-[#FFD29D] transition hover:bg-[#FFD29D] hover:text-[#F85E00]"
            >
              Powered by TheMealDB
            </a>
            <a href="https://github.com/apohorila" target="_blank">
              <FaGithub className="h-6 w-6 text-[#FFD29D] md:h-7 md:w-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/anna-pohorila-45133b314/"
              target="_blank"
            >
              <FaLinkedin className="h-6 w-6 text-[#FFD29D] md:h-7 md:w-7" />
            </a>
          </div>
          <p className="font-[Stolzl] text-sm text-[#FFD29D] md:text-base">
            © Reciply {currYear}
          </p>
        </div>
      </footer>
    </>
  );
}
