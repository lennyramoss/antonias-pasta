import Image from "next/image";
import ReservationForm from "@/components/ReservationForm";

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
        <p className="mt-5 text-[0.95rem] font-medium leading-relaxed text-antonias-body sm:text-[1.05rem]">
          Viví la experiencia Antonias. Pastas artesanales y barra de cócteles. Tigre,
          Buenos Aires. Todos los días de 12:00 a 02:00. Contacto: +54 9 11 28376131 ·
          Instagram: @antoniaspasta
        </p>
        <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-antonias-body sm:text-[1.05rem]">
          Al tocar el botón se abre una reserva guiada, simple y paso a paso.
        </p>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
        <Image
          src="/images/foto_reserva.webp"
          alt="Mesa lista para reservar en Antonias Pasta"
          fill
          sizes="(max-width: 768px) 100vw, 340px"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}
