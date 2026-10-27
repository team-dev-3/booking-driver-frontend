import { useId } from "react";
import { fixedBookingRoutes } from "@/data/booking.mock";
import Icon from "./BookingIcon";
import type { BookingIconName as IconName } from "./BookingIcon";
import { useBookingPreview } from "@/features/booking/useBookingPreview";
import type { BookingDraft } from "@/features/booking/useBookingPreview";
import { formatDateTime } from "@/utils/format";
import styles from "./BookingForm.module.css";

type TextField = "pickup" | "destination" | "name" | "phone" | "departure" | "returnDeparture";
type SelectField = "route" | "seats" | "vehicle";

export default function BookingForm() {
  const id = useId();
  const { draft, errors, preview, change, submit } = useBookingPreview();
  function error(name: string) {
    return errors[name] && <p id={`${id}-${name}-error`} className={styles.error} role="alert">{errors[name]}</p>;
  }
  function field(name: TextField, label: string, icon: IconName, type = "text") {
    return <div className={styles.field}>
      <label htmlFor={`${id}-${name}`}>{label}</label>
      <div className={styles.controlWrap}>
        <Icon name={icon} className={styles.fieldIcon} />
        <input id={`${id}-${name}`} type={type} value={draft[name]} onChange={event => change(name, event.target.value)} placeholder={label} className={styles.control} autoComplete={name === "name" ? "name" : name === "phone" ? "tel" : "off"} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} />
      </div>
      {error(name)}
    </div>;
  }
  function choice(name: SelectField, label: string, icon: IconName, options: {value: string; label: string}[], placeholder?: string) {
    return <div className={styles.field}>
      <label htmlFor={`${id}-${name}`}>{label}</label>
      <div className={styles.controlWrap}>
        <Icon name={icon} className={styles.fieldIcon} />
        <select id={`${id}-${name}`} value={draft[name]} onChange={event => change(name, event.target.value)} className={styles.control} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <Icon name="chevron" className={styles.chevron} />
      </div>
      {error(name)}
    </div>;
  }
  return <div className={styles.card}>
    <div className={styles.modes} role="group" aria-label="Loại dịch vụ">
      {([{id: "shared", label: "Xe ghép", icon: "shared"}, {id: "private", label: "Bao xe", icon: "car"}] as const).map(mode => <button key={mode.id} type="button" aria-pressed={draft.mode === mode.id} onClick={() => change("mode", mode.id)} className={styles.mode}><Icon name={mode.icon} size={20} />{mode.label}</button>)}
    </div>
    <form onSubmit={submit} noValidate aria-label="Đặt xe theo lịch trình" className={styles.form}>
      <fieldset className={styles.group}>
        <legend>Thông tin hành trình</legend>
        {choice("route", "Tuyến đường cố định", "route", fixedBookingRoutes.map(route => ({value: route, label: route})), "Chọn tuyến đường")}
        <div className={styles.row}>
          {field("pickup", "Điểm đón", "pickup")}
          {field("destination", "Điểm đến", "destination")}
        </div>
        <div className={styles.options}>
          {([{id: "oneway", label: "1 chiều"}, {id: "roundtrip", label: "2 chiều"}] as const).map(direction => <label key={direction.id}><input type="radio" name={`${id}-direction`} checked={draft.direction === direction.id} onChange={() => change("direction", direction.id)} className={styles.squareChoice} />{direction.label}</label>)}
          <label><input type="checkbox" checked={draft.invoice} onChange={event => change("invoice", event.target.checked)} className={styles.squareChoice} />Hóa đơn</label>
        </div>
        <div className={draft.mode === "shared" ? styles.row : undefined}>
          {choice("vehicle", "Loại xe", "car", [{value: "4", label: "Xe 4 chỗ"}, {value: "5", label: "Xe 5 chỗ"}, {value: "7", label: "Xe 7 chỗ"}, {value: "16", label: "Xe Limousine 9–16 chỗ"}])}
          {draft.mode === "shared" && choice("seats", "Số lượng ghế", "seat", Array.from({length: Number(draft.vehicle)}, (_, i) => ({value: String(i + 1), label: `${i + 1} ghế`})), "Chọn số ghế")}
        </div>
        <div className={draft.direction === "roundtrip" ? styles.row : undefined}>
          {field("departure", "Ngày giờ đi", "calendar", "datetime-local")}
          {draft.direction === "roundtrip" && field("returnDeparture", "Ngày giờ về", "calendar", "datetime-local")}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>Thông tin liên hệ</legend>
        <div className={styles.row}>
          {field("name", "Họ tên", "user")}
          {field("phone", "Số điện thoại", "phone", "tel")}
        </div>
      </fieldset>
      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>ĐẶT XE NGAY <Icon name="arrow" size={20} /></button>
      </div>
    </form>
    {preview && <BookingSummary draft={preview} />}
  </div>;
}

function BookingSummary({ draft }: { draft: BookingDraft }) {
  return (
    <div
      role="status"
      className="mt-6 bg-white text-slate-800 p-4 rounded-xl text-sm space-y-2"
    >
      <h3 className="font-bold">Kiểm tra hành trình</h3>
      <p>{draft.mode === "shared" ? "Xe ghép" : "Bao xe"} · {draft.route}</p>
      {draft.mode === "shared" && <p>Số lượng: {draft.seats} ghế</p>}
      <p>
        {draft.pickup} → {draft.destination}
      </p>
      <p>
        Xe {draft.vehicle} chỗ ·{" "}
        {formatDateTime(
          draft.departure.slice(0, 10),
          draft.departure.slice(11, 16),
        )}
      </p>
      {draft.direction === "roundtrip" && (
        <p>
          Về:{" "}
          {formatDateTime(
            draft.returnDeparture.slice(0, 10),
            draft.returnDeparture.slice(11, 16),
          )}
        </p>
      )}
      {draft.invoice && <p>Yêu cầu xuất hóa đơn</p>}
      <p>Tổng tiền và phụ phí: chưa có báo giá xác nhận.</p>
      <a href="/chinh-sach-huy-hoan-tien" className="underline text-sky-700">
        Xem điều kiện hủy và hoàn tiền
      </a>
      <p className="text-xs text-slate-500">
        Liên hệ tổng đài để được tư vấn và xác nhận chuyến đi nhanh chóng.
      </p>
      <a
        href="tel:0816665599"
        className="inline-flex items-center px-4 py-2 bg-amber-400 rounded-lg font-bold"
      >
        Gọi 081 666 5599
      </a>
    </div>
  );
}
