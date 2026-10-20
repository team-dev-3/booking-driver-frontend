
"use client";

import { useState } from "react";

const promotions = [
  {
    title: "Ưu đãi xe ghép Toyota Vios",
    image: "/images/promotions/promo1.jpg",
    label: "GIẢM 15%",
  },
  {
    title: "Đặt xe đưa đón tận nơi",
    image: "/images/promotions/promo2.jpg",
    label: "ƯU ĐÃI 10%",
  },
  {
    title: "Khuyến mãi xe ghép Hải Phòng",
    image: "/images/promotions/promo3.jpg",
    label: "GIÁ TỐT",
  },
  {
    title: "Đặt xe sân bay tiết kiệm",
    image: "/images/promotions/promo4.jpg",
    label: "GIẢM 20%",
  },
];

export default function Promotion() {
  const [start, setStart] = useState(0);

  const previous = () => {
    setStart((current) =>
      (current - 1 + promotions.length) % promotions.length
    );
  };

  const next = () => {
    setStart((current) => (current + 1) % promotions.length);
  };

  const visible = Array.from({ length: 3 }, (_, index) => {
    return promotions[(start + index) % promotions.length];
  });

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-xl font-black text-slate-900 md:text-2xl">
          Chương Trình Khuyến Mãi Xe Ghép Hải Phòng
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {visible.map((promotion) => (
              <div
                key={promotion.title}
                className="group relative overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="h-56 w-full object-cover transition group-hover:scale-105"
                />

                <span className="absolute right-3 top-3 rounded bg-orange-500 px-3 py-2 text-xs font-bold text-white">
                  {promotion.label}
                </span>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                  <h3 className="font-bold text-white">
                    {promotion.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={previous}
            aria-label="Khuyến mãi trước"
            className="absolute left-0 top-1/2 -translate-x-1/3 -translate-y-1/2 rounded-full bg-white px-4 py-3 text-xl shadow-lg"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Khuyến mãi tiếp theo"
            className="absolute right-0 top-1/2 translate-x-1/3 -translate-y-1/2 rounded-full bg-white px-4 py-3 text-xl shadow-lg"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {promotions.map((promotion, index) => (
            <button
              key={promotion.title}
              type="button"
              onClick={() => setStart(index)}
              aria-label={`Xem khuyến mãi ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === start
                  ? "w-8 bg-sky-500"
                  : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
