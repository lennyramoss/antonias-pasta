const footerColumns = [
  {
    title: "Ubicación",
    lines: ["Paseo 1536", "Tigre, Buenos Aires", "Argentina"],
  },
  {
    title: "Contacto",
    lines: ["Instagram", "@antoniaspasta", "Reservas"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-antonias-burgundy pb-14 text-antonias-gold">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[700px] border-t border-white/50 pt-[68px]">
        <div className="grid gap-12 sm:grid-cols-[1fr_140px_140px] sm:gap-8">
          <div aria-label="Antonias Pasta" className="text-[1rem] font-extrabold leading-none">
            AP
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[0.95rem] font-extrabold leading-tight">{column.title}</h2>
              <ul className="mt-3 space-y-1.5 text-[0.88rem] font-semibold leading-snug">
                {column.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
