export type ReservationFormData = {
  date: string;
  time: string;
  partySize: number;
};

export type ReservationOutcome = {
  available: boolean;
  allocation?: number[];
  suggestions: string[];
  occupancyRate: number;
};

type TableCount = Record<number, number>;

const OPEN_HOUR = 12;
const LAST_SLOT_HOUR = 1;
const MAX_PARTY_SIZE = 12;
const TABLE_COUNTS: TableCount = {
  2: 47,
  6: 2,
  12: 1,
};

const TOTAL_SEATS = Object.entries(TABLE_COUNTS).reduce(
  (total, [seats, count]) => total + Number(seats) * count,
  0,
);

const SLOT_HOURS = [
  ...Array.from({ length: 12 }, (_, index) => OPEN_HOUR + index),
  0,
  LAST_SLOT_HOUR,
];

export const RESERVATION_SLOTS = SLOT_HOURS.map(formatHour);
export const RESERVATION_MAX_PARTY_SIZE = MAX_PARTY_SIZE;

export function evaluateReservation({
  date,
  time,
  partySize,
}: ReservationFormData, includeSuggestions = true): ReservationOutcome {
  const existingReservations = generateReservations(date, time);
  const availability = resolveAvailability(existingReservations, partySize);

  return {
    ...availability,
    suggestions: !includeSuggestions || availability.available
      ? []
      : findAlternativeSlots(date, time, partySize),
  };
}

export function getSlotAvailability(date: string, partySize: number) {
  return RESERVATION_SLOTS.map((time) => ({
    time,
    ...evaluateReservation({ date, time, partySize }, false),
  }));
}

function findAlternativeSlots(date: string, selectedTime: string, partySize: number) {
  const selectedIndex = RESERVATION_SLOTS.indexOf(selectedTime);

  return getSlotAvailability(date, partySize)
    .filter((slot) => slot.available && slot.time !== selectedTime)
    .sort((left, right) => {
      const leftDistance = Math.abs(
        RESERVATION_SLOTS.indexOf(left.time) - selectedIndex,
      );
      const rightDistance = Math.abs(
        RESERVATION_SLOTS.indexOf(right.time) - selectedIndex,
      );

      return leftDistance - rightDistance;
    })
    .slice(0, 3)
    .map((slot) => slot.time);
}

function resolveAvailability(existingReservations: number[], partySize: number) {
  const tables = { ...TABLE_COUNTS };

  for (const reservationSize of [...existingReservations].sort((left, right) => right - left)) {
    const allocation = findBestAllocation(reservationSize, tables);

    if (!allocation) {
      continue;
    }

    applyAllocation(tables, allocation);
  }

  const allocation = findBestAllocation(partySize, tables);
  const remainingSeats = Object.entries(tables).reduce(
    (total, [seats, count]) => total + Number(seats) * count,
    0,
  );

  return {
    available: Boolean(allocation),
    allocation: allocation ?? undefined,
    occupancyRate: 1 - remainingSeats / TOTAL_SEATS,
  };
}

function generateReservations(date: string, time: string) {
  const seed = hashString(`${date}-${time}`);
  const random = createSeededRandom(seed);
  const reservationsCount = 16 + Math.floor(random() * 28);
  const reservations: number[] = [];

  for (let index = 0; index < reservationsCount; index += 1) {
    const rawPartySize = 1 + Math.floor(random() * MAX_PARTY_SIZE);
    const weightedPartySize =
      rawPartySize > 8 && random() > 0.45 ? Math.max(2, rawPartySize - 2) : rawPartySize;

    reservations.push(weightedPartySize);
  }

  return reservations;
}

function findBestAllocation(partySize: number, tables: TableCount) {
  let best: number[] | null = null;

  const seats = [12, 6, 2];

  function search(index: number, remaining: number, current: number[]) {
    if (remaining <= 0) {
      if (
        !best ||
        sumSeats(current) < sumSeats(best) ||
        (sumSeats(current) === sumSeats(best) && current.length < best.length)
      ) {
        best = [...current];
      }

      return;
    }

    if (index >= seats.length) {
      return;
    }

    const seatSize = seats[index];
    const maxCount = tables[seatSize] ?? 0;

    for (let count = maxCount; count >= 0; count -= 1) {
      const next = current.concat(Array.from({ length: count }, () => seatSize));

      if (best && sumSeats(next) >= sumSeats(best)) {
        continue;
      }

      search(index + 1, remaining - seatSize * count, next);
    }
  }

  search(0, partySize, []);

  return best;
}

function applyAllocation(tables: TableCount, allocation: number[]) {
  for (const seatSize of allocation) {
    tables[seatSize] -= 1;
  }
}

function sumSeats(allocation: number[]) {
  return allocation.reduce((total, seats) => total + seats, 0);
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

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}
