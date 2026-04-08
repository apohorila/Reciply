export default function Home() {
  return (
    <>
      <main>
        <section className="absolute h-screen w-full bg-[#FFD29D] px-15 py-10">
          <div
            style={{ backgroundImage: "url(src/assets/pics/homeback.jpg)" }}
            className="relative mx-auto h-9/10 rounded-4xl border-2 border-amber-800 bg-cover bg-center flex flex-col items-center justify-center"
          >
            <div className="font-[Stolzl] text-[white] flex-col items-center">
                <h1 className="text-4xl text-center">Find your next <br/> favorite meal</h1>
                <h2>Search by ingredient, cuisine, or dish name</h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
