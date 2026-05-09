import Link from "next/link";

export default function StaffDemoCTA() {
  return (
    <section
      aria-labelledby="staff-demo-title"
      className="mx-auto grid w-[calc(100%-2rem)] max-w-[700px] gap-7 py-20 text-white sm:py-24 md:grid-cols-[1fr_auto] md:items-center"
    >
      <div>
        <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.24em] text-antonias-gold/80">
          Acceso interno demo
        </p>
        <h2
          id="staff-demo-title"
          className="mt-4 text-[2.05rem] font-extrabold uppercase leading-[0.95] text-antonias-gold sm:text-[2.7rem]"
        >
          Panel de reservas
        </h2>
        <p className="mt-4 max-w-[520px] text-[0.98rem] font-medium leading-relaxed text-antonias-body sm:text-[1.04rem]">
          Vista de prueba para meseros y jefes de meseros. Permite revisar reservas,
          horarios, estados y carga del servicio con datos simulados.
        </p>
        <p className="mt-3 text-[0.9rem] font-semibold leading-relaxed text-white/70">
          Es solo una demo: no guarda datos, no confirma reservas y no reemplaza un
          panel administrativo real.
        </p>
      </div>

      <Link
        href="/demo/reservas"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-antonias-gold/60 bg-antonias-gold px-7 text-[0.96rem] font-extrabold text-antonias-ink shadow-[0_18px_38px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-white hover:text-antonias-detail focus:outline-none focus:ring-2 focus:ring-antonias-gold focus:ring-offset-2 focus:ring-offset-black"
      >
        Entrar al panel demo
      </Link>
    </section>
  );
}
