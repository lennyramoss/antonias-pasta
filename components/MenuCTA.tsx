export default function MenuCTA() {
  return (
    <section
      aria-labelledby="carta-title"
      className="mx-auto flex w-[calc(100%-2rem)] max-w-[700px] justify-center py-[152px] text-center sm:py-[172px]"
    >
      <div className="max-w-[520px] text-antonias-gold">
        <h2
          id="carta-title"
          className="text-[2.4rem] font-extrabold uppercase leading-[0.95] sm:text-[3.2rem]"
        >
          Ver carta completa
        </h2>
        <p className="mx-auto mt-3 max-w-[280px] text-[1rem] font-semibold leading-snug text-antonias-body sm:text-[1.08rem]">
          Descubrí todos nuestros platos y cócteles.
        </p>
        <a
          href="https://drive.google.com/file/d/1dfqjvVFCTDOpj_yidwHMakH79GeNIXEb/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center rounded-full bg-antonias-gold px-6 py-3 text-[0.9rem] font-extrabold leading-none text-antonias-ink transition-colors hover:bg-antonias-goldSoft focus:outline-none focus:ring-2 focus:ring-antonias-gold focus:ring-offset-2 focus:ring-offset-antonias-base"
        >
          Abrir menú PDF
        </a>
      </div>
    </section>
  );
}
