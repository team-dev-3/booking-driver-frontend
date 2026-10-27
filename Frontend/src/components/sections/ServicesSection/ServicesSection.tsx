import { Link, useSearchParams } from "react-router-dom";
import { serviceFares, servicePreviews } from "@/data/stitch.mock";
import { normalizeSearch } from "@/utils/search";
import { formatCurrency } from "@/utils/format";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const cards = servicePreviews.filter((card) =>
    normalizeSearch(card.title + " " + card.features.join(" ")).includes(
      normalizeSearch(query),
    ),
  );
  return (
    <section
      className={`py-14 ${styles.section}`}
      id="detailed-services"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1
            id="services-heading"
            className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight"
          >
            BẢNG GIÁ XE GHÉP &amp; DỊCH VỤ XE TIỆN CHUYẾN
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Chọn tuyến phù hợp và liên hệ đặt xe. Giá dưới đây là giá tham khảo.
          </p>
        </div>
        {query && (
          <p role="status" className="mb-6 text-sm text-slate-600">
            {cards.length} dịch vụ phù hợp với “{query}” ·{" "}
            <Link to="/#detailed-services" className="underline">
              Xóa tìm kiếm
            </Link>
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <article key={card.title} className={styles.card}>
              <img
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                loading="lazy"
                className={styles.image}
              />
              <div className={styles.content}>
                <div className={styles.badges}>
                  {card.badges.map((badge, index) => (
                    <span key={badge.label} className={index === 0 ? styles.waitingBadge : styles.pickupBadge}>
                      {badge.label}
                    </span>
                  ))}
                </div>
                <h3 className={styles.title}>{card.title}</h3>
                <ul className={styles.features}>
                  {card.features.map((feature) => (
                    <li key={feature}>{feature.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>
                <div className={styles.fares}>
                  {serviceFares[card.title]?.map((fare) => (
                    <p key={fare.route}>
                      <span>{fare.route}</span>
                      <strong>{formatCurrency(fare.price)}</strong>
                    </p>
                  )) ?? <p>Liên hệ để nhận báo giá hành trình.</p>}
                </div>
                <a href="tel:0816665599" className={styles.bookingLink}>
                  Đặt Xe: 081 666 5599
                </a>
              </div>
            </article>
          ))}
        </div>
        {cards.length === 0 && (
          <div className="p-8 text-center rounded-2xl border border-slate-200 bg-slate-50">
            <h3 className="font-bold">Chưa có dịch vụ phù hợp</h3>
            <p className="text-sm mt-2">
              Thử tìm theo tên tỉnh, thành phố hoặc xóa tìm kiếm.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
