import { useNavigate } from "react-router";

export default function PopularDish({ title, img, id }) {
  const navigate = useNavigate();
  return (
    <div className="h-127.5 w-101.25 rounded-[60px] border-2 border-[#FFD29D] bg-white font-[Stolzl]">
      <div className="h-58.3 rounded-[60px] border-0">
        <img
          src={img}
          className="h-58.25 w-full rounded-t-[60px] object-cover"
        />
      </div>
      <div className="px-8 pt-13">
        <p>Quick</p>
        <h1 className="text-[32px] leading-tight">{title}</h1>
        <div
          className="mt-6 flex cursor-pointer space-x-0.5"
          onClick={() => navigate(`/recipe/${id}`)}
        >
          <p className="hover:underline">Save</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
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
