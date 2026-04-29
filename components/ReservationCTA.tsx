import PlaceholderImage from "@/components/PlaceholderImage";

export default function ReservationCTA() {
  return (
    <section
      id="reservas"
      aria-labelledby="reservar-title"
      className="mx-auto grid w-[calc(100%-2rem)] max-w-[700px] items-center gap-10 py-[142px] sm:py-[172px] md:grid-cols-2 md:gap-8"
    >
      <div className="max-w-[430px] text-left text-white">
        <h2
          id="reservar-title"
          className="text-[2.4rem] font-extrabold uppercase leading-[0.95] text-antonias-gold sm:text-[3.2rem]"
        >
          Reservar mesa
        </h2>
        <p className="mt-5 text-[0.95rem] font-medium leading-relaxed text-white/85 sm:text-[1.05rem]">
          Viví la experiencia Antonias. Pastas artesanales y barra de cócteles. Tigre,
          Buenos Aires. Todos los días de 19:00 a 00:00. Contacto: +54 9 11 1234-5678 ·
          Instagram: @antoniaspasta
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[10px]">
        <PlaceholderImage
          label="Imagen para reservar una mesa en Antonias Pasta"
          variant="circle"
          className="aspect-[4/5] w-full rounded-[10px]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />
        <a
          href="tel:+5491112345678"
          className="absolute bottom-7 left-1/2 inline-flex min-w-52 -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-full bg-antonias-gold px-10 py-4 text-[0.86rem] font-bold leading-none tracking-normal text-antonias-ink shadow-[0_22px_44px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-white hover:text-antonias-burgundy focus:outline-none focus:ring-2 focus:ring-antonias-gold focus:ring-offset-2 focus:ring-offset-black sm:min-w-60 sm:px-12 sm:py-5 sm:text-[0.94rem]"
        >
          Reservar mesa
        </a>
      </div>
    </section>
  );
}
