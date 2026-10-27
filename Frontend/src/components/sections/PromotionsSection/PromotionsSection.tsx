import { useEffect, useState } from "react";
import Icon from "@/components/common/Icon/Icon";
import styles from "./PromotionsSection.module.css";

const banners = [
(<div key="promotion-1" className="relative rounded-2xl overflow-hidden card-shadow bg-zinc-900 text-white min-h-[200px] flex flex-col justify-between group">
            <img
              alt="Trải nghiệm Toyota Vios"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              height="393"
              loading="lazy"
              src="/images/stitch/asset-21.webp"
              width="720"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30"></div>
            <div className="absolute top-3 right-3 bg-brand-orange text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase shadow-sm">
              Ưu đãi 15%
            </div>
            <div className="relative z-10 p-5">
              <span className="text-xs text-yellow-300 font-bold uppercase tracking-wider block">
                Trải nghiệm
              </span>
              <h3 className="text-xl font-black mt-1 uppercase text-white">
                TOYOTA VIOS
              </h3>
              <p className="text-[11px] text-slate-200 mt-1">
                Dàn xe đời mới, điều hòa thơm tho
              </p>
            </div>
            <div className="relative z-10 p-5 pt-0">
              <a
                className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:text-amber-200 transition"
                href="tel:0816665599"
              >
                Nhận ưu đãi đặt xe{" "}
                <Icon className="stitch-icon" name="fa-arrow-right"></Icon>
              </a>
            </div>
          </div>),
(<div key="promotion-2" className="relative rounded-2xl overflow-hidden card-shadow bg-emerald-900 text-white min-h-[200px] flex flex-col justify-between group">
            <img
              alt="Đưa đi đón về"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              height="393"
              loading="lazy"
              src="/images/stitch/asset-22.webp"
              width="720"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-900/30 to-emerald-950/30"></div>
            <div className="absolute top-3 right-3 bg-brand-orange text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase shadow-sm">
              Ưu đãi 15%
            </div>
            <div className="relative z-10 p-5">
              <span className="text-xs text-yellow-300 font-bold uppercase tracking-wider block">
                Đưa đi đón về
              </span>
              <h3 className="text-xl font-black mt-1 uppercase text-white">
                ĐẶT TAXI NGAY NHA
              </h3>
              <p className="text-[11px] text-slate-200 mt-1">
                Khi thuê xe có tài xế chu đáo
              </p>
            </div>
            <div className="relative z-10 p-5 pt-0">
              <a
                className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 hover:text-yellow-200 transition"
                href="tel:0816665599"
              >
                Hotline: 081 666 5599{" "}
                <Icon className="stitch-icon" name="fa-phone"></Icon>
              </a>
            </div>
          </div>),
(<div key="promotion-3" className="relative rounded-2xl overflow-hidden card-shadow bg-slate-900 text-white min-h-[200px] flex flex-col justify-between group">
            <img
              alt="Gói thuê xe dài hạn"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              height="655"
              loading="lazy"
              src="/images/stitch/asset-23.webp"
              width="1200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-slate-950/30"></div>
            <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase shadow-sm">
              Dịch vụ mới
            </div>
            <div className="relative z-10 p-5">
              <span className="text-xs text-sky-300 font-bold uppercase tracking-wider block">
                Tiết kiệm từ 5-10%
              </span>
              <h3 className="text-xl font-black mt-1 uppercase text-white">
                GÓI THUÊ XE DÀI HẠN
              </h3>
              <p className="text-[11px] text-slate-200 mt-1">
                Giao nhận tận nơi • Bảo dưỡng tận nơi
              </p>
            </div>
            <div className="relative z-10 p-5 pt-0">
              <a
                className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 hover:text-yellow-200 transition"
                href="#booking-form"
              >
                Xem chi tiết gói{" "}
                <Icon className="stitch-icon" name="fa-arrow-right"></Icon>
              </a>
            </div>
          </div>)
];

export default function PromotionsSection() {
  const [position, setPosition] = useState(3);
  const [moving, setMoving] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setVisible(media.matches ? 3 : 1);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => {
      if (position >= 6 || position < 3) {
        setAnimate(false);
        setPosition(position >= 6 ? position - 3 : position + 3);
      }
      setMoving(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [moving, position]);
  useEffect(() => {
    if (animate) return;
    let secondFrame = 0;
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setAnimate(true));
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame); };
  }, [animate]);
  function advance(direction: number) {
    if (moving || !animate) return;
    setMoving(true);
    setPosition(previous => previous + direction);
  }
  return (
    <section className="py-14 bg-white" id="promotions" aria-labelledby="promotions-heading">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 id="promotions-heading" className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Chương trình khuyến mại xe ghép GOMOVE</h2>
        </div>
        <div className={styles.carousel} role="region" aria-roledescription="băng chuyền" aria-label="Chương trình khuyến mại" onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            advance(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}>
          <button type="button" className={styles.previous} aria-label="Khuyến mại trước" disabled={moving} onClick={() => advance(-1)}>‹</button>
          <div className={styles.viewport}>
            <div className={`${styles.track} ${animate ? '' : styles.reset}`} style={{transform: `translateX(calc(-${position} * (100% + var(--promo-gap)) / var(--promo-visible)))`}}>
              {[...banners, ...banners, ...banners].map((banner, index) => (
                <div key={index} className={styles.slide} inert={index < position || index >= position + visible} aria-hidden={index < position || index >= position + visible}>{banner}</div>
              ))}
            </div>
          </div>
          <button type="button" className={styles.next} aria-label="Khuyến mại tiếp theo" disabled={moving} onClick={() => advance(1)}>›</button>
        </div>
        <p className={styles.status} role="status">Khuyến mại {position % 3 + 1} / 3</p>
      </div>
    </section>
  );
}
