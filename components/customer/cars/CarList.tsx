
import { cars } from "@/data/cars";
import CarCard from "./CarCard";

export default function CarList() {
  return (
    <section id="dich-vu" className="scroll-mt-28 bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="rounded-full bg-amber-100 px-4 py-2 text-[11px] font-bold text-amber-700">
            BẢNG GIÁ & TUYẾN ĐƯỜNG THÔNG DỤNG
          </span>

          <h2 className="mt-5 text-2xl font-black text-slate-900 md:text-3xl">
            DỊCH VỤ XE GHÉP & XE TIỆN CHUYẾN
            <span className="text-red-600"> GOMOVE</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
            Dịch vụ xe ghép, xe tiện chuyến, thuê xe riêng với mức giá
            hợp lý và dịch vụ đưa đón tận nơi.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
