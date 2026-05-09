import {
  evaluateReservation,
  RESERVATION_SLOTS,
} from "@/lib/reservationSimulation";

export type StaffRole = "waiter" | "lead";
export type DemoReservationStatus =
  | "confirmed"
  | "arriving"
  | "seated"
  | "delayed"
  | "cancelled";

export type DemoReservation = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  status: DemoReservationStatus;
  tableLabel: string;
  area: "Salon" | "Terraza" | "Ventanal" | "Barra";
  notes: string;
  priority: "normal" | "attention";
};

export type DemoReservationsSummary = {
  totalReservations: number;
  activeReservations: number;
  expectedGuests: number;
  attentionCount: number;
  seatedGuests: number;
  occupancyRate: number;
  nextArrivals: number;
};

const FIRST_NAMES = [
  "Sofia",
  "Martina",
  "Camila",
  "Valentina",
  "Lucia",
  "Mora",
  "Julian",
  "Mateo",
  "Tomas",
  "Nicolas",
  "Santiago",
  "Bruno",
  "Carla",
  "Florencia",
  "Agustina",
  "Diego",
  "Federico",
  "Mariano",
];

const LAST_NAMES = [
  "Rossi",
  "Ferrer",
  "Campos",
  "Mendez",
  "Paz",
  "Silva",
  "Arias",
  "Ponce",
  "Luna",
  "Vega",
  "Costa",
  "Rivas",
  "Benitez",
  "Moreno",
  "Sosa",
  "Ibarra",
];

const NOTES = [
  "Mesa tranquila",
  "Cumpleanos",
  "Cochecito",
  "Prefiere terraza",
  "Sin TACC",
  "Aniversario",
  "Cliente frecuente",
  "Cerca de entrada",
  "Botella reservada",
  "Sin observaciones",
];

const AREAS: DemoReservation["area"][] = ["Salon", "Terraza", "Ventanal", "Barra"];
const STATUS_LABELS: Record<DemoReservationStatus, string> = {
  confirmed: "Confirmada",
  arriving: "Por llegar",
  seated: "Sentados",
  delayed: "Demorada",
  cancelled: "Cancelada",
};

const STATUS_ORDER: DemoReservationStatus[] = [
  "arriving",
  "delayed",
  "seated",
  "confirmed",
  "cancelled",
];

export const DEMO_STATUS_LABELS = STATUS_LABELS;
export const DEMO_STATUS_OPTIONS = STATUS_ORDER;

export function getDemoReservations(date: string) {
  const reservations: DemoReservation[] = [];

  RESERVATION_SLOTS.forEach((time, slotIndex) => {
    const random = createSeededRandom(hashString(`${date}-${time}-staff-demo`));
    const baseCount = getBaseReservationCount(time);
    const reservationsCount = Math.max(2, baseCount + Math.floor(random() * 5) - 1);

    for (let index = 0; index < reservationsCount; index += 1) {
      const partySize = getPartySize(random);
      const evaluation = evaluateReservation({ date, time, partySize }, false);
      const status = getStatus(time, index, random);
      const note = NOTES[Math.floor(random() * NOTES.length)];
      const name = `${pick(FIRST_NAMES, random)} ${pick(LAST_NAMES, random)}`;
      const tableLabel = formatTableLabel(
        evaluation.allocation ?? [partySize <= 2 ? 2 : partySize <= 6 ? 6 : 12],
        slotIndex,
        index,
      );

      reservations.push({
        id: `${date}-${time}-${index}`,
        name,
        phone: `+54 9 11 ${String(2000 + Math.floor(random() * 7000))} ${String(
          1000 + Math.floor(random() * 8999),
        )}`,
        date,
        time,
        partySize,
        status,
        tableLabel,
        area: pick(AREAS, random),
        notes: note,
        priority:
          status === "delayed" || note === "Sin TACC" || partySize >= 9
            ? "attention"
            : "normal",
      });
    }
  });

  return reservations.sort((left, right) => {
    const timeSort = toSortableMinutes(left.time) - toSortableMinutes(right.time);

    if (timeSort !== 0) {
      return timeSort;
    }

    return STATUS_ORDER.indexOf(left.status) - STATUS_ORDER.indexOf(right.status);
  });
}

export function getDemoSummary(reservations: DemoReservation[]): DemoReservationsSummary {
  const activeReservations = reservations.filter(
    (reservation) => reservation.status !== "cancelled",
  );
  const seatedReservations = reservations.filter(
    (reservation) => reservation.status === "seated",
  );
  const expectedGuests = activeReservations.reduce(
    (total, reservation) => total + reservation.partySize,
    0,
  );
  const seatedGuests = seatedReservations.reduce(
    (total, reservation) => total + reservation.partySize,
    0,
  );

  return {
    totalReservations: reservations.length,
    activeReservations: activeReservations.length,
    expectedGuests,
    attentionCount: reservations.filter(
      (reservation) => reservation.priority === "attention",
    ).length,
    seatedGuests,
    occupancyRate: Math.min(0.98, expectedGuests / 112),
    nextArrivals: reservations.filter(
      (reservation) =>
        reservation.status === "arriving" || reservation.status === "delayed",
    ).length,
  };
}

export function getSlotLoad(reservations: DemoReservation[]) {
  return RESERVATION_SLOTS.map((time) => {
    const slotReservations = reservations.filter(
      (reservation) =>
        reservation.time === time && reservation.status !== "cancelled",
    );
    const guests = slotReservations.reduce(
      (total, reservation) => total + reservation.partySize,
      0,
    );
    const occupancyRate = Math.min(0.98, guests / 112);

    return {
      time,
      reservations: slotReservations.length,
      guests,
      occupancyRate,
      tone:
        occupancyRate >= 0.78
          ? "full"
          : occupancyRate >= 0.48
            ? "active"
            : "calm",
    };
  });
}

export function formatDemoDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${date}T12:00:00`));
}

function getBaseReservationCount(time: string) {
  const hour = Number(time.split(":")[0]);

  if (hour >= 20 || hour <= 1) {
    return 8;
  }

  if (hour >= 12 && hour <= 15) {
    return 6;
  }

  return 3;
}

function getPartySize(random: () => number) {
  const roll = random();

  if (roll > 0.92) {
    return 9 + Math.floor(random() * 4);
  }

  if (roll > 0.68) {
    return 5 + Math.floor(random() * 4);
  }

  return 2 + Math.floor(random() * 4);
}

function getStatus(
  time: string,
  index: number,
  random: () => number,
): DemoReservationStatus {
  const minutes = toSortableMinutes(time);

  if (random() > 0.94) {
    return "cancelled";
  }

  if (minutes < 17 * 60 || (minutes >= 20 * 60 && index < 2)) {
    return random() > 0.28 ? "seated" : "arriving";
  }

  if (random() > 0.86) {
    return "delayed";
  }

  return index % 4 === 0 ? "arriving" : "confirmed";
}

function formatTableLabel(allocation: number[], slotIndex: number, index: number) {
  const prefix = allocation.length > 1 ? "Unir " : "Mesa ";
  const tableNumbers = allocation.map((_, allocationIndex) =>
    String(((slotIndex * 7 + index * 3 + allocationIndex) % 50) + 1).padStart(2, "0"),
  );

  return `${prefix}${tableNumbers.join(" + ")}`;
}

function pick<Item>(items: Item[], random: () => number) {
  return items[Math.floor(random() * items.length)];
}

function toSortableMinutes(time: string) {
  const [hour, minutes] = time.split(":").map(Number);
  const normalizedHour = hour < 3 ? hour + 24 : hour;

  return normalizedHour * 60 + minutes;
}

function hashString(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: number) {
  let state = seed || 1;

  return function next() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
