import Link from "next/link";
import type { ReactNode } from "react";

export default function ReservationTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <Link href="/reservas" className={className}>
      {children}
    </Link>
  );
}
