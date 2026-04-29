import PlaceholderImage from "@/components/PlaceholderImage";

const featuredMenus = [
  {
    title: "Menú Ejecutivo.",
    description:
      "Lunes a Viernes · 12 a 16 hs. Principal, salsa, postre y bebida a elección. $13.500.",
    placeholder: "square" as const,
    label: "Imagen destacada del menú ejecutivo de Antonias Pasta",
  },
  {
    title: "Menú Experiencia.",
    description:
      "Todos los días · Almuerzo y Cena. Entrada, principal, salsa, postre a elección. $18.000.",
    placeholder: "circle" as const,
    label: "Imagen destacada del menú experiencia de Antonias Pasta",
  },
];

export default function FeaturedMenus() {
  return (
    <section
      aria-label="Menús destacados"
      className="mx-auto mt-[112px] grid w-[calc(100%-2rem)] max-w-[700px] gap-10 sm:grid-cols-2 sm:gap-4"
    >
      {featuredMenus.map((menu) => (
        <article key={menu.title}>
          <PlaceholderImage
            label={menu.label}
            variant={menu.placeholder}
            className="aspect-square w-full"
          />
          <div className="mt-5 max-w-[310px] text-antonias-gold">
            <h3 className="text-[1.35rem] font-extrabold leading-tight sm:text-[1.55rem]">
              {menu.title}
            </h3>
            <p className="mt-2 text-[1rem] font-semibold leading-snug sm:text-[1.08rem]">
              {menu.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
