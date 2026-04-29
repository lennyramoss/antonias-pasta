import PlaceholderImage from "@/components/PlaceholderImage";

const galleryItems = [
  {
    label: "Galería de ambiente íntimo en Antonias Pasta",
    placeholder: "square" as const,
  },
  {
    label: "Galería de pastas artesanales de Antonias Pasta",
    placeholder: "circle" as const,
  },
  {
    label: "Galería de barra de cócteles de Antonias Pasta",
    placeholder: "triangle" as const,
  },
  {
    label: "Galería de mesa servida en Antonias Pasta",
    placeholder: "square" as const,
  },
];

export default function Gallery() {
  return (
    <section
      aria-label="Galería"
      className="mx-auto grid w-[calc(100%-2rem)] max-w-[700px] grid-cols-1 gap-2 pt-12 sm:grid-cols-2 sm:gap-2"
    >
      {galleryItems.map((item) => (
        <PlaceholderImage
          key={item.label}
          label={item.label}
          variant={item.placeholder}
          className="aspect-square w-full rounded-[7px]"
        />
      ))}
    </section>
  );
}
