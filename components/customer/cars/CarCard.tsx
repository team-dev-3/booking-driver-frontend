
"use client";

import type { Car } from "@/types/car";

type Props = {
  car: Car;
};

const badgeStyles = {
  red: "bg-red-500",
  blue: "bg-sky-500",
  green: "bg-emerald-500",
  orange: "bg-amber-500",
};

export default function CarCard({ car }: Props) {
  const selectCar = () => {
    window.dispatchEvent(
      new CustomEvent("gomove:select-car", {
        detail: { route: car.route },
      })
    );

    document.getElementById("dat-xe")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={car.image}
          alt={car.name}
          className="h-36 w-full object-cover"
        />
        {car.badge && (
          <span
            className={`absolute left-2 top-2 rounded px-2 py-1 text-[10px] font-bold text-white ${
              badgeStyles[car.badgeColor ?? "red"]
            }`}
          >
            {car.badge}
          </span>
        )}
      </div>

      <div className="px-2 pb-2 pt-3">
        <div className="mb-2 flex items-center justify-between gap-1">
          <span className="text-xs text-gray-500">{car.seats}</span>
          <strong className="text-sm text-red-600">
            {car.price.toLocaleString("vi-VN")}đ
          </strong>
        </div>

        <h3 className="min-h-9 text-xs font-extrabold uppercase text-slate-900">
          {car.name}
        </h3>

        <ul className="mt-2 min-h-12 space-y-1">
          {car.features.map((feature) => (
            <li key={feature} className="text-[11px] text-gray-600">
              <span className="mr-1 text-emerald-500">●</span>
              {feature}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={selectCar}
          className="mt-3 w-full rounded-md bg-amber-500 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-400"
        >
          ☎ ĐẶT XE NGAY
        </button>
      </div>
    </article>
  );
}
