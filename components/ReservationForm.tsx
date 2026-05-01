"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  evaluateReservation,
  getSlotAvailability,
  RESERVATION_MAX_PARTY_SIZE,
} from "@/lib/reservationSimulation";

type FormState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
};

const initialDate = getTodayInLocalFormat();

export default function ReservationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    date: initialDate,
    time: "20:00",
    partySize: "2",
  });
  const [result, setResult] = useState<ReturnType<typeof evaluateReservation> | null>(
    null,
  );

  const partySize = Number(form.partySize);
  const slotAvailability = getSlotAvailability(form.date, partySize);
  const selectedSlot = slotAvailability.find((slot) => slot.time === form.time);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function openModal() {
    setResult(null);
    setStep(1);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateField<Key extends keyof FormState>(field: Key, value: FormState[Key]) {
    setResult(null);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function goToStep(nextStep: number) {
    setResult(null);
    setStep(nextStep);
  }

  function checkAvailability() {
    const evaluation = evaluateReservation({
      date: form.date,
      time: form.time,
      partySize,
    });

    setResult(evaluation);
    setStep(5);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex min-w-52 items-center justify-center whitespace-nowrap rounded-full bg-antonias-gold px-10 py-4 text-[1rem] font-bold leading-none tracking-normal text-antonias-ink shadow-[0_22px_44px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-white hover:text-antonias-detail focus:outline-none focus:ring-2 focus:ring-antonias-gold focus:ring-offset-2 focus:ring-offset-black sm:min-w-60 sm:px-12 sm:py-5 sm:text-[1.08rem]"
      >
        Reservar mesa
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 sm:items-center sm:p-6">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
            className="relative z-10 max-h-[92vh] w-full max-w-[640px] overflow-y-auto rounded-[28px] border border-white/10 bg-[#240607] p-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-antonias-gold/80">
                  Paso {step} de 5
                </p>
                <h3
                  id="reservation-modal-title"
                  className="mt-3 text-[1.9rem] font-extrabold uppercase leading-[0.95] text-antonias-gold sm:text-[2.3rem]"
                >
                  {getStepTitle(step)}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[1.3rem] text-white transition hover:border-antonias-gold/60"
                aria-label="Cerrar reserva"
              >
                ×
              </button>
            </div>

            <div className="mt-6 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-antonias-gold transition-[width]"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>

            <div className="mt-7">
              {step === 1 ? (
                <section>
                  <p className="text-[1.02rem] leading-relaxed text-antonias-body">
                    ¿Para cuántas personas querés reservar?
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {Array.from({ length: RESERVATION_MAX_PARTY_SIZE }, (_, index) => {
                      const value = String(index + 1);
                      const isSelected = form.partySize === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            updateField("partySize", value);
                            goToStep(2);
                          }}
                          className={`min-h-16 rounded-2xl border text-[1.05rem] font-bold transition ${
                            isSelected
                              ? "border-antonias-gold bg-antonias-gold text-antonias-ink"
                              : "border-white/10 bg-black/20 text-white hover:border-antonias-gold/60"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {step === 2 ? (
                <section>
                  <p className="text-[1.02rem] leading-relaxed text-antonias-body">
                    Elegí la fecha para {form.partySize} personas.
                  </p>
                  <div className="mt-5">
                    <Field label="Fecha" htmlFor="reservation-date">
                      <input
                        id="reservation-date"
                        type="date"
                        name="date"
                        min={initialDate}
                        value={form.date}
                        onChange={(event) => updateField("date", event.target.value)}
                        className={inputClassName}
                      />
                    </Field>
                  </div>
                </section>
              ) : null}

              {step === 3 ? (
                <section>
                  <p className="text-[1.02rem] leading-relaxed text-antonias-body">
                    Tocá un horario. Marcamos simple qué turnos están disponibles.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {slotAvailability.map((slot) => {
                      const isSelected = slot.time === form.time;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => updateField("time", slot.time)}
                          className={`rounded-2xl border px-3 py-4 text-left transition ${
                            isSelected
                              ? "border-antonias-gold bg-antonias-gold text-antonias-ink"
                              : slot.available
                                ? "border-white/10 bg-black/20 text-white hover:border-antonias-gold/60"
                                : "border-white/10 bg-black/10 text-white/55"
                          }`}
                        >
                          <span className="block text-[1.05rem] font-bold leading-none">
                            {slot.time}
                          </span>
                          <span className="mt-2 block text-[0.8rem] font-semibold">
                            {slot.available ? "Disponible" : "Completo"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {step === 4 ? (
                <section>
                  <p className="text-[1.02rem] leading-relaxed text-antonias-body">
                    Último paso. Dejanos tus datos para completar la simulación.
                  </p>
                  <div className="mt-5 grid gap-4">
                    <Field label="Nombre" htmlFor="reservation-name">
                      <input
                        id="reservation-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className={inputClassName}
                        placeholder="Tu nombre"
                      />
                    </Field>

                    <Field label="Telefono" htmlFor="reservation-phone">
                      <input
                        id="reservation-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        className={inputClassName}
                        placeholder="+54 9 11..."
                      />
                    </Field>
                  </div>
                </section>
              ) : null}

              {step === 5 ? (
                <section aria-live="polite">
                  {result?.available ? (
                    <div className="rounded-[22px] border border-antonias-gold/20 bg-black/20 p-5">
                      <p className="text-[1.15rem] font-bold text-antonias-gold">
                        Hay lugar para {form.partySize} personas.
                      </p>
                      <p className="mt-3 text-[1rem] leading-relaxed text-white">
                        {formatDate(form.date)} a las {form.time}
                      </p>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-antonias-body">
                        Asignación simulada: {formatAllocation(result.allocation ?? [])}.
                      </p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-antonias-body">
                        Esta demo no guarda datos ni confirma la reserva.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                      <p className="text-[1.15rem] font-bold text-antonias-gold">
                        Ese horario ya está completo.
                      </p>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-antonias-body">
                        Te sugerimos:{" "}
                        {result?.suggestions.length
                          ? result.suggestions.join(", ")
                          : "probar otra fecha"}.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {result?.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => {
                              updateField("time", suggestion);
                              goToStep(4);
                            }}
                            className="rounded-full border border-antonias-gold/40 px-4 py-2 text-[0.92rem] font-semibold text-white transition hover:bg-antonias-gold hover:text-antonias-ink"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => (step === 1 ? closeModal() : goToStep(step - 1))}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-5 text-[0.96rem] font-semibold text-white transition hover:border-antonias-gold/60"
              >
                {step === 1 ? "Cancelar" : "Volver"}
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => goToStep(step + 1)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-antonias-gold px-6 text-[0.96rem] font-bold text-antonias-ink transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Continuar
                </button>
              ) : null}

              {step === 4 ? (
                <button
                  type="button"
                  onClick={checkAvailability}
                  disabled={!form.name.trim() || !form.phone.trim()}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-antonias-gold px-6 text-[0.96rem] font-bold text-antonias-ink transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Ver disponibilidad
                </button>
              ) : null}

              {step === 5 ? (
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-antonias-gold px-6 text-[0.96rem] font-bold text-antonias-ink transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Cerrar
                </button>
              ) : null}
            </div>

            {step < 5 ? (
              <div className="mt-4 rounded-[18px] border border-white/10 bg-black/20 p-4 text-[0.94rem] leading-relaxed text-antonias-body">
                Resumen: {form.partySize} personas, {formatDate(form.date)}, {form.time}.
                {selectedSlot?.available === false ? " Ese horario figura completo." : ""}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  children,
  htmlFor,
  label,
}: {
  children: ReactNode;
  htmlFor: string;
  label: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-[0.78rem] font-bold uppercase tracking-[0.22em] text-antonias-gold/80">
        {label}
      </span>
      {children}
    </label>
  );
}

function getStepTitle(step: number) {
  switch (step) {
    case 1:
      return "¿Cuántas personas?";
    case 2:
      return "Elegí la fecha";
    case 3:
      return "Elegí el horario";
    case 4:
      return "Tus datos";
    case 5:
      return "Resultado";
    default:
      return "Reserva";
  }
}

function formatAllocation(allocation: number[]) {
  const grouped = allocation.reduce<Record<number, number>>((accumulator, seats) => {
    accumulator[seats] = (accumulator[seats] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .sort((left, right) => Number(left[0]) - Number(right[0]))
    .map(([seats, count]) => `${count} mesa${count > 1 ? "s" : ""} de ${seats}`)
    .join(" + ");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function getTodayInLocalFormat() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const inputClassName =
  "min-h-14 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-[0.98rem] font-medium text-white outline-none transition placeholder:text-white/35 focus:border-antonias-gold focus:ring-2 focus:ring-antonias-gold/30";
