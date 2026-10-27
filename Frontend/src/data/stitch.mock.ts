/** Exact presentation content from Stitch screen d715db80d97540c08cab031b8023d586. Preview data, not live availability. */
export interface DesignImage {
  src: string;
  alt: string;
  width: string;
  height: string;
  class?: string[];
  loading?: string;
  decoding?: string;
}
export interface ServicePreview {
  title: string;
  image: DesignImage;
  features: string[];
  badges: { label: string; className: string }[];
}
export const servicePreviews: ServicePreview[] = [
  {
    title: "XE GHÉP HÀ NỘI",
    image: {
      alt: "Xe ghép Hà Nội",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-13.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Taxi 4,5 và 7 chỗ giá rẻ",
      "• Taxi đưa đón sân bay, tàu xe",
      "• Dịch vụ taxi du lịch, tham quan",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "XE GHÉP HẢI PHÒNG",
    image: {
      alt: "Xe ghép Hải Phòng",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-14.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Taxi 4,5 và 7 chỗ giá rẻ",
      "• Taxi đưa đón sân bay Cát Bi",
      "• Đưa đón nội thành, ngoại ô",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "XE GHÉP HẠ LONG",
    image: {
      alt: "Xe ghép Hạ Long",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-15.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Taxi 4,5 và 7 chỗ giá rẻ",
      "• Xe tiện chuyến chạy liên tục",
      "• Dịch vụ tour vịnh Bái Tử Long",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "XE GHÉP QUẢNG NINH",
    image: {
      alt: "Xe ghép Quảng Ninh",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-16.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Taxi 4,5 và 7 chỗ giá rẻ",
      "• Cẩm Phả, Uông Bí, Tiên Yên",
      "• Xe đời mới điều hòa mát lạnh",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "XE GHÉP THÁI BÌNH",
    image: {
      alt: "Xe ghép Thái Bình",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-17.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Tuyến HP - Thái Bình hàng ngày",
      "• Đưa đón bến xe, bệnh viện",
      "• Giá chỉ từ 200k/ghế",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "XE GHÉP MÓNG CÁI",
    image: {
      alt: "Xe ghép Móng Cái",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-18.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Tuyến cao tốc chạy thẳng",
      "• Đưa đón tận cửa khẩu Móng Cái",
      "• Nhận gửi kèm hàng hóa nhanh",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "XE GHÉP THANH HÓA",
    image: {
      alt: "Xe ghép Thanh Hóa",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-19.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Tuyến Hải Phòng - Thanh Hóa",
      "• Bao xe hợp đồng du lịch Sầm Sơn",
      "• Tài xế thông thuộc cung đường",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
  {
    title: "TAXI NỘI BÀI",
    image: {
      alt: "Taxi Nội Bài",
      class: ["w-full", "h-full", "object-cover"],
      src: "/images/stitch/asset-20.webp",
      width: "720",
      height: "393",
      decoding: "async",
      loading: "lazy",
    },
    features: [
      "• Đưa đón Nội Bài - Hải Phòng 24/7",
      "• Canh đúng giờ hạ cánh bay",
      "• Miễn phí biển đón tên sảnh đến",
    ],
    badges: [
      {
        label: "Miễn phí chờ",
        className:
          "bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
      {
        label: "Đón tận nơi",
        className:
          "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs",
      },
    ],
  },
];

/** Giá tham khảo giữ lại từ bảng giá trong thiết kế, chưa phải báo giá vận hành. */
export const serviceFares: Record<string, { route: string; price: number }[]> = {
  "XE GHÉP HÀ NỘI": [
    { route: "Hà Nội – Hải Phòng", price: 400000 },
    { route: "Hà Nội – Hạ Long", price: 450000 },
  ],
  "XE GHÉP HẠ LONG": [
    { route: "Hải Phòng – Hạ Long", price: 250000 },
  ],
  "XE GHÉP MÓNG CÁI": [
    { route: "Hạ Long – Móng Cái", price: 350000 },
    { route: "Hải Phòng – Móng Cái", price: 500000 },
  ],
};
