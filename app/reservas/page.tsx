import ReservationForm from "@/components/ReservationForm";

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-antonias-base px-4 py-16 text-white sm:px-6 sm:py-20">
      <section className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-[420px]">
          <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.28em] text-antonias-gold/80">
            Reservas
          </p>
          <h1 className="mt-4 text-[2.8rem] font-extrabold uppercase leading-[0.92] text-antonias-gold sm:text-[4rem]">
            Tu mesa en Antonias
          </h1>
          <p className="mt-5 text-[1rem] font-medium leading-relaxed text-antonias-body sm:text-[1.08rem]">
            Completá la reserva paso a paso en una sola página. Elegís cantidad de
            personas, fecha, horario y después revisás la disponibilidad.
          </p>
          <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-antonias-body">
            Todos los días de 12:00 a 02:00. Tigre, Buenos Aires. Contacto:
            +54 9 11 28376131.
          </p>
        </div>

        <ReservationForm />
      </section>
    </main>
  );
}
