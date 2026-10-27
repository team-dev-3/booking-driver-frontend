import { useState } from "react";

export default function MapPreview({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return loaded ? (
    <iframe
      title="Bản đồ văn phòng GOMOVE"
      className="w-full h-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer"
      src={src}
    />
  ) : (
    <div className="w-full h-full bg-slate-100 flex flex-col gap-4 items-center justify-center p-6 text-center">
      <span className="text-slate-600 text-sm">
        Tòa Nhà Đông Phương · Hải Phòng
      </span>
      <button
        type="button"
        className="bg-white rounded-xl border border-slate-300 text-sky-700 px-5 py-3 text-sm font-bold"
        onClick={() => setLoaded(true)}
      >
        Tải bản đồ tương tác
      </button>
    </div>
  );
}
