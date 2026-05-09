"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEMO_STATUS_LABELS,
  DEMO_STATUS_OPTIONS,
  formatDemoDate,
  getDemoReservations,
  getDemoSummary,
  getSlotLoad,
  type DemoReservationStatus,
  type StaffRole,
} from "@/lib/demoReservations";

const roleLabels: Record<StaffRole, string> = {
  waiter: "Mesero",
  lead: "Jefe de meseros",
};

const statusTone: Record<DemoReservationStatus, string> = {
  confirmed: "border-white/10 bg-white/[0.06] text-white",
  arriving: "border-antonias-gold/30 bg-antonias-gold/15 text-antonias-gold",
  seated: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
  delayed: "border-red-300/25 bg-red-400/10 text-red-100",
  cancelled: "border-white/10 bg-black/20 text-white/45",
};

export default function StaffReservationsDemo() {
  const [role, setRole] = useState<StaffRole>("waiter");
  const [date, setDate] = useState(() => getTodayInLocalFormat());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DemoReservationStatus | "all">("all");
  const [time, setTime] = useState("all");
  const [attentionOnly, setAttentionOnly] = useState(false);

  const reservations = useMemo(() => getDemoReservations(date), [date]);
  const summary = useMemo(() => getDemoSummary(reservations), [reservations]);
  const slotLoad = useMemo(() => getSlotLoad(reservations), [reservations]);
  const availableTimes = useMemo(
    () => slotLoad.filter((slot) => slot.reservations > 0).map((slot) => slot.time),
    [slotLoad],
  );

  const filteredReservations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return reservations.filter((reservation) => {
      const matchesQuery =
        !normalizedQuery ||
        reservation.name.toLowerCase().includes(normalizedQuery) ||
        reservation.phone.toLowerCase().includes(normalizedQuery) ||
        reservation.tableLabel.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "all" || reservation.status === status;
      const matchesTime = time === "all" || reservation.time === time;
      const matchesAttention =
        !attentionOnly || reservation.priority === "attention";

      return matchesQuery && matchesStatus && matchesTime && matchesAttention;
    });
  }, [attentionOnly, query, reservations, status, time]);

  return (
    <main className="min-h-screen bg-antonias-base text-white">
      <section className="border-b border-white/10 bg-[linear-gradient(135deg,#160303_0%,#000000_52%,#2b0809_100%)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-antonias-gold/80">
              Demo staff
            </p>
            <h1 className="mt-3 text-[2.4rem] font-extrabold uppercase leading-[0.92] text-antonias-gold sm:text-[3.6rem]">
              Reservas del servicio
            </h1>
            <p className="mt-3 max-w-2xl text-[0.98rem] font-medium leading-relaxed text-antonias-body">
              Panel demo sin backend para visualizar turnos, estados y carga de mesas.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-5 text-[0.92rem] font-semibold text-white transition hover:border-antonias-gold/60"
            >
              Inicio
            </Link>
            <div className="grid grid-cols-2 rounded-full border border-white/10 bg-black/25 p-1">
              {(["waiter", "lead"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={`min-h-10 rounded-full px-4 text-[0.88rem] font-bold transition ${
                    role === option
                      ? "bg-antonias-gold text-antonias-ink"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {roleLabels[option]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Fecha">
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={controlClassName}
                />
              </Field>
              <Field label="Buscar">
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nombre, telefono o mesa"
                  className={controlClassName}
                />
              </Field>
              <Field label="Estado">
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as DemoReservationStatus | "all")
                  }
                  className={controlClassName}
                >
                  <option value="all">Todos</option>
                  {DEMO_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {DEMO_STATUS_LABELS[option]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Horario">
                <select
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className={controlClassName}
                >
                  <option value="all">Todos</option>
                  {availableTimes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {role === "lead" ? (
              <button
                type="button"
                onClick={() => setAttentionOnly((current) => !current)}
                className={`min-h-12 rounded-full border px-5 text-[0.92rem] font-bold transition ${
                  attentionOnly
                    ? "border-antonias-gold bg-antonias-gold text-antonias-ink"
                    : "border-white/10 bg-black/20 text-white hover:border-antonias-gold/50"
                }`}
              >
                Solo alertas
              </button>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <Metric label="Reservas" value={summary.activeReservations} />
            <Metric label="Cubiertos" value={summary.expectedGuests} />
            <Metric
              label="Ocupacion"
              value={`${Math.round(summary.occupancyRate * 100)}%`}
            />
            <Metric label="Por llegar" value={summary.nextArrivals} />
            <Metric label="Sentados" value={summary.seatedGuests} />
            <Metric label="Alertas" value={summary.attentionCount} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.55fr]">
            <section className="rounded-[8px] border border-white/10 bg-[#170405] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[1.05rem] font-extrabold uppercase tracking-[0.08em] text-antonias-gold">
                    Carga por horario
                  </h2>
                  <p className="mt-1 text-[0.9rem] text-antonias-body">
                    {formatDemoDate(date)}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.78rem] font-bold text-white/70">
                  {roleLabels[role]}
                </span>
              </div>

              <div className="mt-4 grid gap-2">
                {slotLoad.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setTime(slot.time)}
                    className={`grid grid-cols-[4.2rem_1fr_auto] items-center gap-3 rounded-[8px] border p-3 text-left transition ${
                      time === slot.time
                        ? "border-antonias-gold bg-antonias-gold/15"
                        : "border-white/10 bg-black/20 hover:border-antonias-gold/40"
                    }`}
                  >
                    <span className="font-extrabold text-white">{slot.time}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`block h-full rounded-full ${
                          slot.tone === "full"
                            ? "bg-red-300"
                            : slot.tone === "active"
                              ? "bg-antonias-gold"
                              : "bg-emerald-300"
                        }`}
                        style={{ width: `${Math.round(slot.occupancyRate * 100)}%` }}
                      />
                    </span>
                    <span className="text-right text-[0.82rem] font-semibold text-antonias-body">
                      {slot.reservations} res. · {slot.guests}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[8px] border border-white/10 bg-[#170405] shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-2 border-b border-white/10 p-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-[1.05rem] font-extrabold uppercase tracking-[0.08em] text-antonias-gold">
                    Reservas visibles
                  </h2>
                  <p className="mt-1 text-[0.9rem] text-antonias-body">
                    {filteredReservations.length} de {summary.totalReservations} registros demo
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setStatus("all");
                    setTime("all");
                    setAttentionOnly(false);
                  }}
                  className="min-h-10 rounded-full border border-white/10 px-4 text-[0.86rem] font-bold text-white transition hover:border-antonias-gold/50"
                >
                  Limpiar filtros
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="bg-black/25 text-[0.72rem] uppercase tracking-[0.18em] text-white/50">
                    <tr>
                      <th className="px-4 py-3 font-bold">Hora</th>
                      <th className="px-4 py-3 font-bold">Cliente</th>
                      <th className="px-4 py-3 font-bold">Mesa</th>
                      <th className="px-4 py-3 font-bold">Estado</th>
                      <th className="px-4 py-3 font-bold">Notas</th>
                      {role === "lead" ? (
                        <th className="px-4 py-3 font-bold">Atencion</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="bg-transparent transition hover:bg-white/[0.035]"
                      >
                        <td className="px-4 py-4 align-top">
                          <span className="block text-[1rem] font-extrabold text-white">
                            {reservation.time}
                          </span>
                          <span className="mt-1 block text-[0.82rem] font-semibold text-antonias-body">
                            {reservation.partySize} pers.
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span className="block font-bold text-white">
                            {reservation.name}
                          </span>
                          <span className="mt-1 block text-[0.82rem] text-antonias-body">
                            {reservation.phone}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span className="block font-bold text-white">
                            {reservation.tableLabel}
                          </span>
                          <span className="mt-1 block text-[0.82rem] text-antonias-body">
                            {reservation.area}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[0.78rem] font-bold ${statusTone[reservation.status]}`}
                          >
                            {DEMO_STATUS_LABELS[reservation.status]}
                          </span>
                        </td>
                        <td className="max-w-[210px] px-4 py-4 align-top text-[0.9rem] font-medium leading-snug text-antonias-body">
                          {reservation.notes}
                        </td>
                        {role === "lead" ? (
                          <td className="px-4 py-4 align-top">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-[0.78rem] font-bold ${
                                reservation.priority === "attention"
                                  ? "border-red-300/25 bg-red-400/10 text-red-100"
                                  : "border-white/10 bg-white/[0.04] text-white/45"
                              }`}
                            >
                              {reservation.priority === "attention"
                                ? "Revisar"
                                : "Normal"}
                            </span>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.22em] text-antonias-gold/75">
        {label}
      </span>
      {children}
    </label>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-[#170405] p-4">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <p className="mt-2 text-[1.85rem] font-extrabold leading-none text-white">
        {value}
      </p>
    </div>
  );
}

function getTodayInLocalFormat() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const controlClassName =
  "min-h-12 w-full rounded-[8px] border border-white/10 bg-black/25 px-4 text-[0.95rem] font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-antonias-gold focus:ring-2 focus:ring-antonias-gold/25";
