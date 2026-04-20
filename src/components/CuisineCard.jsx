export default function CuisineCard({ title, img, description }) {
  return (
    <div className="mx-auto w-full max-w-95 space-y-6 overflow-hidden rounded-[40px] bg-white shadow-sm md:space-y-8 md:rounded-[60px]">
      <div className="h-64 w-full md:h-72">
        <img
          src={img}
          alt={`Picture of ${title}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center space-y-4 px-6 pb-8 text-center md:space-y-6">
        <h1 className="text-2xl leading-tight font-bold text-amber-900 md:text-4xl">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
