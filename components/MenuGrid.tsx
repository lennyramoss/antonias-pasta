import PlaceholderImage from "@/components/PlaceholderImage";

const menuItems = [
  {
    name: "Sorrentinos.",
    detail: "$16.500 · Rellenos y salsa a elección.",
    placeholder: "square" as const,
  },
  {
    name: "Ravioles de calabaza.",
    detail: "$14.000 · Recomendados con crema.",
    placeholder: "circle" as const,
  },
  {
    name: "Ñoquis de albahaca.",
    detail: "$12.000 · Aromáticos, frescos y ligeros.",
    placeholder: "triangle" as const,
  },
  {
    name: "Negroni.",
    detail: "$10.000 · Gin, Campari, Vermouth Carpano Rosso.",
    placeholder: "square" as const,
  },
  {
    name: "Aperol Spritz.",
    detail: "$10.000 · Aperol, Espumante Chandon Extra Brut, Soda.",
    placeholder: "circle" as const,
  },
  {
    name: "Podua.",
    detail: "$12.000 · Aperol, soda de maracuyá, Chandon Extra Brut.",
    placeholder: "triangle" as const,
  },
];

export default function MenuGrid() {
  return (
    <section
      aria-label="Platos y cócteles"
      className="mx-auto mt-[112px] grid w-[calc(100%-2rem)] max-w-[700px] gap-x-4 gap-y-[86px] sm:grid-cols-2 lg:grid-cols-3"
    >
      {menuItems.map((item) => (
        <article key={item.name}>
          <PlaceholderImage
            label={`Imagen de ${item.name.replace(".", "")} en Antonias Pasta`}
            variant={item.placeholder}
            className="aspect-square w-full"
          />
          <div className="mt-5">
            <h3 className="text-[1.18rem] font-extrabold leading-tight text-antonias-gold sm:text-[1.35rem]">
              {item.name}
            </h3>
            <p className="mt-2 max-w-[250px] text-[0.95rem] font-semibold leading-snug text-antonias-body sm:text-[1.02rem]">
              {item.detail}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
