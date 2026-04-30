export default function LocationHours() {
  return (
    <section
      aria-labelledby="ubicacion-title"
      className="bg-antonias-detail py-20 text-antonias-gold sm:py-28"
    >
      <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[980px] items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <div>
          <h2
            id="ubicacion-title"
            className="mt-5 text-[2.4rem] font-extrabold uppercase leading-[0.95] text-antonias-gold sm:text-[3.2rem]"
          >
            Ubicación y horarios
          </h2>
          <address className="mt-8 not-italic">
            <p className="text-[1.35rem] font-bold leading-tight text-white sm:text-[1.55rem]">
              Trilenium Tigre
            </p>
            <p className="mt-5 text-[1rem] font-medium leading-relaxed text-antonias-body sm:text-[1.08rem]">
              Todos los días 19:00 - 00:00
            </p>
          </address>
        </div>

        <div className="overflow-hidden rounded-[22px] bg-antonias-detail shadow-[0_28px_80px_rgba(0,0,0,0.34)] ring-1 ring-antonias-gold/20">
          <iframe
            title="Ubicación de Antonias Pasta en Trilenium Tigre"
            src="https://www.google.com/maps?q=Antonias%20Pasta%20Tigre&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 sm:h-[380px]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
