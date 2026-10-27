import { designIcons } from "./designIcons";

type LineIconName =
  | "calendar"
  | "route"
  | "seat"
  | "car"
  | "phone"
  | "pin"
  | "arrow"
  | "check"
  | "shield"
  | "clock"
  | "menu"
  | "close"
  | "user"
  | "search"
  | "chevron"
  | "mail"
  | "plane";

export type IconName = LineIconName | keyof typeof designIcons;

const paths: Record<LineIconName, string> = {
  calendar: "M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2ZM7 2v4M17 2v4M3 9h18M7 13h3M14 13h3M7 17h3",
  route: "M7 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5 8v5a3 3 0 0 0 3 3h5a3 3 0 0 0 0-6h-1a3 3 0 0 1 0-6h7v12",
  seat: "M7 4h5a2 2 0 0 1 2 2v7h4a2 2 0 0 1 2 2v3H7V4ZM4 8v8a5 5 0 0 0 5 5h10M10 18v3",

  car: "M4.5 9 6 5a2 2 0 0 1 1.9-1.4h8.2A2 2 0 0 1 18 5l1.5 4M5 8H3.4A1.4 1.4 0 0 1 2 6.6M19 8h1.6A1.4 1.4 0 0 0 22 6.6M4.5 9h15l1.5 3v8h-3v-2H6v2H3v-8l1.5-3ZM3 17h18M5.5 12l3 .5v1.5h-3V12ZM18.5 12l-3 .5v1.5h3V12ZM10 13h4M8 17l1.5-2h5l1.5 2",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 3-2 2a16 16 0 0 0 5.7 5.7l2-2 3 .5a2 2 0 0 1 1.7 2Z",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  arrow: "M4 12h16M14 6l6 6-6 6",
  check: "m5 12 4 4L19 6",
  shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6",
  clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  user: "M20 21v-2a7 7 0 0 0-14 0v2M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
  search: "m21 21-6-6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  chevron: "m9 5 7 7-7 7",
  mail: "M3 5h18v14H3V5Zm0 0 9 8 9-8",
  plane: "m22 2-7 20-4-9-9-4L22 2ZM11 13 22 2",
};

export default function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const resolvedName = name === "fa-car" || name === "fa-car-side" ? "car" : name;
  if (isDesignIcon(resolvedName)) {
    const icon = designIcons[resolvedName];
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        {icon.paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ fill: "none" }}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[resolvedName]} />
    </svg>
  );
}

function isDesignIcon(name: IconName): name is keyof typeof designIcons {
  return name in designIcons;
}
