export default function CategoryLabel({ label }) {
  return (
    <div className="w-fit rounded-full md:rounded-4xl border-0 bg-[#F85E00] px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm text-[#FFD29D] font-[Stolzl]">
      <p>{label}</p>
    </div>
  );
}
