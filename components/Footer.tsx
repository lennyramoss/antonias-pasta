const footerLinks = [
  {
    title: "Explorar",
    items: [
      { label: "Reseñas", href: "#resenas" },
      { label: "Reservas", href: "#reservas" },
      { label: "Ubicación", href: "#ubicacion-title" },
    ],
  },
  {
    title: "Contacto",
    items: [
      { label: "@antoniaspasta", href: "https://www.instagram.com/antoniaspasta/" },
      { label: "+54 9 11 28376131", href: "https://api.whatsapp.com/send/?phone=%2B5491128376131&text&type=phone_number&app_absent=0" },
      {
        label: "Google Maps",
        href: "https://www.google.com/maps?q=Antonias%20Pasta%20Tigre",
      },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-antonias-base pb-10 pt-16 text-antonias-gold sm:pb-14 sm:pt-20">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[980px] rounded-[28px] border border-antonias-detail/80 bg-antonias-detail/35 px-6 py-10 shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-10">
          <div className="max-w-[360px]">
            <p className="text-[0.9rem] font-extrabold uppercase tracking-[0.2em] text-antonias-gold/80">
              Antonias Pasta
            </p>
            <h2 className="mt-4 text-[2.35rem] font-extrabold uppercase leading-[0.92] text-white sm:text-[2.9rem]">
              Pastas artesanales y barra de tragos en Tigre
            </h2>
            <p className="mt-5 text-[0.98rem] font-medium leading-relaxed text-antonias-body sm:text-[1.04rem]">
              Un espacio cálido para comer rico, brindar y volver. Todos los días de
              12:00 a 02:00 en Trilenium Tigre.
            </p>
            <a
              href="#reservas"
              className="mt-7 inline-flex items-center rounded-full bg-antonias-gold px-6 py-3 text-[0.95rem] font-extrabold leading-none text-antonias-ink transition-colors hover:bg-antonias-goldSoft focus:outline-none focus:ring-2 focus:ring-antonias-gold focus:ring-offset-2 focus:ring-offset-antonias-base"
            >
              Reservar mesa
            </a>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.98rem] font-extrabold uppercase tracking-[0.12em] text-antonias-gold">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[0.95rem] font-medium leading-relaxed text-antonias-body transition-colors hover:text-white focus:outline-none focus:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-antonias-detail/80 pt-5 text-[0.84rem] font-medium leading-relaxed text-antonias-body sm:mt-12 sm:flex sm:items-center sm:justify-between">
          <p>© {currentYear} Antonias Pasta. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">Tigre, Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
