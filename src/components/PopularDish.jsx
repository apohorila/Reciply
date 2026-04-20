import { useNavigate } from "react-router";

export default function PopularDish({ title, img, id }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto w-full max-w-85 overflow-hidden rounded-[40px] border-2 border-[#FFD29D] bg-white font-[Stolzl] shadow-sm md:rounded-[60px]">
      <div className="h-64 w-full">
        <img src={img} className="h-full w-full object-cover" />
      </div>
      <div className="px-6 pt-8 pb-8 md:px-8 md:pt-13">
        <p className="text-sm text-gray-500">Quick</p>
        <h1 className="mt-1 truncate text-2xl leading-tight md:text-[32px]">
          {title}
        </h1>
        <div
          className="mt-6 flex cursor-pointer items-center space-x-0.5 text-amber-700"
          onClick={() => navigate(`/recipe/${id}`)}
        >
          <p className="hover:underline">Save</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
