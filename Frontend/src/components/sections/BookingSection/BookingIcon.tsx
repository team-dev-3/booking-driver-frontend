export type BookingIconName =
  | "route" | "pickup" | "destination" | "shared" | "seat"
  | "car" | "calendar" | "user" | "phone" | "chevron" | "arrow";

const paths: Record<BookingIconName, string> = {
  route: "M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 7v7a4 4 0 0 0 4 4h1M18 17v-7a4 4 0 0 0-4-4h-1M10 6h.01M14 18h.01",
  pickup: "M12 3v3M12 18v3M3 12h3M18 12h3M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  destination: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  shared: "M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 20v-2a6 6 0 0 1 12 0v2M18 5a3 3 0 0 1 0 6M21 20v-2a5 5 0 0 0-3-4M6 5a3 3 0 0 0 0 6M3 20v-2a5 5 0 0 1 3-4",
  seat: "M8 3h8a2 2 0 0 1 2 2v9H6V5a2 2 0 0 1 2-2ZM6 14H5v4h14v-4h-1M8 18v3M16 18v3M9 7h6M9 10h6",
  car: "M5 10l1.5-4A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1L19 10M5 10h14a2 2 0 0 1 2 2v6H3v-6a2 2 0 0 1 2-2ZM5 18v2M19 18v2M3 9H2M22 9h-1M6 14h2M16 14h2M10 15h4",
  calendar: "M7 3v4M17 3v4M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM3 10h18M7 14h2M15 14h2M7 17h2",
  user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 21v-2a7 7 0 0 1 14 0v2",
  phone: "M8 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-3l-5-2-2 2a12 12 0 0 1-6-6l2-2-2-5Z",
  chevron: "m6 9 6 6 6-6",
  arrow: "M4 12h16M14 6l6 6-6 6",
};

export default function BookingIcon({ name, size = 20, className }: {
  name: BookingIconName;
  size?: number;
  className?: string;
}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
    <path d={paths[name]} />
  </svg>;
}
