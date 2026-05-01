const reviews = [
  {
    name: "santi pozo",
    when: "Hace 1 día",
    details: "Cena | $10,000-20,000",
    text: "La comida riquísima, el precio súper bien para lo que sale comer hoy en día, y la atención 10/10. Daila, la chica que nos atendió, un amor, súper predispuesta para todo. Hace tiempo no nos atendían así.",
  },
  {
    name: "Erasmo Colombo",
    when: "Hace un mes",
    details: null,
    text: "Realmente muy recomendable, la comida excelente, la atención muy buena y el ambiente muy agradable. Vamos a volver!!",
  },
  {
    name: "Julian Serra",
    when: "Hace 1 día",
    details: "Almuerzo | $10,000-20,000",
    text: "Lugar al que volvería cada vez que pueda. La atención de Pablo fue excepcional, siempre pendiente y muy respetuoso. La comida, desde la entrada hasta el postre, de lo mejor que he comido en Buenos Aires. Lo recomendaré siempre.",
  },
];

export default function Reviews() {
  return (
    <section
      id="resenas"
      aria-labelledby="resenas-title"
      className="mx-auto w-[calc(100%-2rem)] max-w-[980px] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[700px] text-center">
        <p className="text-[0.95rem] font-extrabold uppercase tracking-[0.18em] text-antonias-gold sm:text-[1rem]">
          Google Reviews
        </p>
        <h2
          id="resenas-title"
          className="mt-4 text-[2.4rem] font-extrabold uppercase leading-[0.95] text-antonias-gold sm:text-[3.2rem]"
        >
          Reseñas
        </h2>
        <p className="mt-5 text-[1.2rem] font-bold leading-tight text-white sm:text-[1.45rem]">
          <span className="text-antonias-gold">★ 4.9</span> · +800 reseñas en Google
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-[22px] border border-antonias-detail/80 bg-antonias-detail/55 p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-sm"
          >
            <p className="text-[1rem] font-black leading-none tracking-[0.16em] text-antonias-gold">
              ★★★★★
            </p>
            <div className="mt-5">
              <h3 className="text-[1.12rem] font-extrabold leading-tight text-white">
                {review.name}
              </h3>
              <p className="mt-1 text-[0.88rem] font-semibold leading-relaxed text-antonias-body">
                {review.when}
              </p>
              {review.details ? (
                <p className="mt-4 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-antonias-gold/90">
                  {review.details}
                </p>
              ) : null}
            </div>
            <p className="mt-5 text-[0.98rem] font-medium leading-relaxed text-white/92">
              {review.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
