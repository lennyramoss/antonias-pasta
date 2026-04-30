export default function About() {
  return (
    <section
      aria-labelledby="nosotros-title"
      className="mx-auto w-[calc(100%-2rem)] max-w-[700px] pt-14 sm:pt-[62px]"
    >
      <div className="max-w-[620px]">
        <h2
          id="nosotros-title"
          className="text-[2.4rem] font-extrabold uppercase leading-[0.95] text-antonias-gold sm:text-[3.2rem]"
        >
          Nosotros
        </h2>
        <div className="mt-4 space-y-4 text-[0.95rem] font-medium leading-relaxed text-antonias-body sm:text-[1.05rem]">
          <p>
            En Antonias Pasta, celebramos la tradición italiana con pastas artesanales y una
            barra de cócteles de autor. Nuestro propuesta invita a disfrutar de un espacio
            íntimo y elegante, envuelto en una atmósfera de luces bajas, tonos oscuros,
            madera y mantel.
          </p>
          <p>
            Cada plato se elabora con pasión, desde salsas caseras hasta pastas rellenas.
            Somos el lugar donde Tigre redescubre el auténtico sabor italiano en un ambiente
            exclusivo, cálido y seguro.
          </p>
        </div>
      </div>
    </section>
  );
}
