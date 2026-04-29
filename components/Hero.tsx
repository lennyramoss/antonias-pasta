import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative flex h-[82svh] items-center justify-center overflow-hidden bg-antonias-ink px-6 text-center text-white">
      <Image
        src="/images/hero-restaurant.webp"
        alt="Salón íntimo de Antonias Pasta con mesas servidas, luces cálidas y barra de tragos"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[72rem]">
        <h1 className="text-balance text-[4.6rem] font-bold leading-[0.9] tracking-normal text-white [font-family:var(--font-dancing-script)] [text-shadow:0_12px_34px_rgba(0,0,0,0.5)] sm:text-[7.4rem] lg:text-[10rem]">
          Antonias Pasta
        </h1>
        <p className="mt-7 text-[1rem] font-semibold leading-relaxed tracking-normal text-white/90 [text-shadow:0_8px_26px_rgba(0,0,0,0.42)] sm:text-[1.35rem]">
          Pastas artesanales &amp; barra de tragos en Tigre
        </p>
        <a
          href="#reservas"
          className="mt-10 inline-flex min-w-52 items-center justify-center rounded-full bg-antonias-gold px-10 py-4 text-[0.86rem] font-bold leading-none tracking-normal text-antonias-ink shadow-[0_22px_44px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-white hover:text-antonias-burgundy focus:outline-none focus:ring-2 focus:ring-antonias-gold focus:ring-offset-2 focus:ring-offset-black sm:min-w-60 sm:px-12 sm:py-5 sm:text-[0.94rem]"
        >
          Reservar mesa
        </a>
      </div>
    </header>
  );
}
