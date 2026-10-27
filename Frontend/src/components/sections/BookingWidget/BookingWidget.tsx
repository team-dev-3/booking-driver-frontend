import { useId, useState } from "react";
import type { FormEvent } from "react";
import Icon from "@/components/common/Icon/Icon";
import type { IconName } from "@/components/common/Icon/Icon";
import { useTripSearch } from "@/features/search/useTripSearch";
import type { TripSearchOptions } from "@/features/search/useTripSearch";
import { getTodayVN } from "@/utils/date";
import { isValidPhone } from "@/utils/validation";
import { routePreviews } from "@/data/home.mock";
import styles from "./BookingWidget.module.css";

export default function BookingWidget(options: TripSearchOptions) {
  const { form, errors, isSubmitting, change, clearError, submit } =
    useTripSearch(options);
  const [passenger, setPassenger] = useState({ name: "", phone: "" });
  const id = useId();
  const fields: {
    name: "from" | "to" | "date" | "time";
    label: string;
    type: string;
    placeholder: string;
    icon: IconName;
  }[] = [
    {
      name: "from",
      label: "Điểm đón",
      type: "text",
      placeholder: "Điểm đón (Số nhà, đường, quận/huyện...)",
      icon: "pin",
    },
    {
      name: "to",
      label: "Điểm đến",
      type: "text",
      placeholder: "Điểm đến (Hải Phòng, Hà Nội, Hạ Long...)",
      icon: "pin",
    },
    {
      name: "date",
      label: "Ngày đi",
      type: "date",
      placeholder: "",
      icon: "car",
    },
    {
      name: "time",
      label: "Giờ đi",
      type: "time",
      placeholder: "",
      icon: "clock",
    },
  ];
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const contactErrors: Record<string, string> = {};
    if (!isValidPhone(passenger.phone))
      contactErrors.phone = "Vui lòng nhập số điện thoại Việt Nam hợp lệ";
    submit(event, contactErrors);
  }
  function routeSelect(value: string) {
    const route = routePreviews.find((item) => item.id === value);
    if (route) {
      change("from", route.from);
      change("to", route.to);
    }
  }
  const selectedRoute =
    routePreviews.find(
      (route) => route.from === form.from && route.to === form.to,
    )?.id ?? "";
  return (
    <div className={styles.widget}>
      <div className={styles.switch} aria-label="Loại chuyến xe">
        {[
          { value: "shared", label: "Xe ghép" },
          { value: "private", label: "Bao xe" },
        ].map((item) => (
          <button
            type="button"
            key={item.value}
            aria-pressed={form.service === item.value}
            onClick={() => change("service", item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} noValidate aria-label="Tìm chuyến xe">
        <div className={styles.tripOptions}>
          <label>
            <input
              type="radio"
              name={`${id}-direction`}
              checked={form.direction === "oneway"}
              onChange={() => change("direction", "oneway")}
            />
            1 chiều
          </label>
          <label>
            <input
              type="radio"
              name={`${id}-direction`}
              checked={form.direction === "roundtrip"}
              onChange={() => change("direction", "roundtrip")}
            />
            2 chiều
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.vat === "yes"}
              onChange={(event) =>
                change("vat", event.target.checked ? "yes" : "no")
              }
            />
            Hóa đơn VAT
          </label>
        </div>
        <div className={styles.fields}>
          <div className={`${styles.field} ${styles.wide}`}>
            <label htmlFor={`${id}-route`} className={styles.srOnly}>
              Tuyến xe
            </label>
            <div className={styles.control}>
              <Icon name="arrow" size={17} />
              <select
                id={`${id}-route`}
                value={selectedRoute}
                onChange={(event) => routeSelect(event.target.value)}
              >
                <option value="">Hải Phòng ⇄ Hà Nội</option>
                {routePreviews
                  .filter((route) => route.from)
                  .map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {fields.slice(0, 2).map((field) => (
            <div key={field.name} className={`${styles.field} ${styles.wide}`}>
              <label htmlFor={`${id}-${field.name}`} className={styles.srOnly}>
                {field.label}
              </label>
              <div className={styles.control}>
                <Icon name={field.icon} size={17} />
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={(event) => change(field.name, event.target.value)}
                  aria-invalid={!!errors[field.name]}
                  aria-describedby={
                    errors[field.name] ? `${id}-${field.name}-error` : undefined
                  }
                  autoComplete="off"
                />
              </div>
              {errors[field.name] && (
                <p
                  id={`${id}-${field.name}-error`}
                  className={styles.error}
                  role="alert"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <div className={styles.field}>
            <label htmlFor={`${id}-vehicle`} className={styles.srOnly}>
              Loại xe
            </label>
            <div className={styles.control}>
              <Icon name="car" size={17} />
              <select
                id={`${id}-vehicle`}
                value={form.vehicle}
                onChange={(event) => change("vehicle", event.target.value)}
              >
                <option value="4">Xe 4–5 chỗ Sedan/Hatchback</option>
                <option value="7">Xe 7 chỗ</option>
                <option value="16">Xe 16 chỗ</option>
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-seats`} className={styles.srOnly}>
              Số hành khách
            </label>
            <div className={styles.control}>
              <Icon name="user" size={17} />
              <select
                id={`${id}-seats`}
                value={form.seats}
                onChange={(event) => change("seats", event.target.value)}
              >
                {Array.from({ length: Number(form.vehicle) - 1 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} ghế
                  </option>
                ))}
              </select>
            </div>
          </div>
          {fields.slice(2).map((field) => (
            <div key={field.name} className={styles.field}>
              <label htmlFor={`${id}-${field.name}`} className={styles.srOnly}>
                {field.label}
              </label>
              <div className={styles.control}>
                <Icon name={field.icon} size={17} />
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={(event) => change(field.name, event.target.value)}
                  min={field.type === "date" ? getTodayVN() : undefined}
                  aria-invalid={!!errors[field.name]}
                  aria-describedby={
                    errors[field.name] ? `${id}-${field.name}-error` : undefined
                  }
                />
              </div>
              {errors[field.name] && (
                <p
                  id={`${id}-${field.name}-error`}
                  className={styles.error}
                  role="alert"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          {form.direction === "roundtrip" && (
            <div className={`${styles.field} ${styles.wide}`}>
              <label htmlFor={`${id}-returnDate`}>Ngày về</label>
              <div className={styles.control}>
                <Icon name="car" size={17} />
                <input
                  id={`${id}-returnDate`}
                  type="date"
                  min={form.date}
                  value={form.returnDate}
                  onChange={(event) => change("returnDate", event.target.value)}
                  aria-invalid={!!errors.returnDate}
                  aria-describedby={
                    errors.returnDate ? `${id}-return-error` : undefined
                  }
                />
              </div>
              {errors.returnDate && (
                <p
                  id={`${id}-return-error`}
                  className={styles.error}
                  role="alert"
                >
                  {errors.returnDate}
                </p>
              )}
            </div>
          )}
          <div className={styles.field}>
            <label htmlFor={`${id}-name`} className={styles.srOnly}>
              Họ và tên
            </label>
            <div className={styles.control}>
              <Icon name="user" size={17} />
              <input
                id={`${id}-name`}
                placeholder="Họ và tên"
                value={passenger.name}
                onChange={(event) =>
                  setPassenger((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                autoComplete="name"
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-phone`} className={styles.srOnly}>
              Số điện thoại
            </label>
            <div className={styles.control}>
              <Icon name="phone" size={17} />
              <input
                id={`${id}-phone`}
                type="tel"
                inputMode="tel"
                placeholder="Số điện thoại *"
                value={passenger.phone}
                onChange={(event) => {
                  setPassenger((previous) => ({
                    ...previous,
                    phone: event.target.value,
                  }));
                  clearError("phone");
                }}
                autoComplete="tel"
                required
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone ? `${id}-phone-error` : undefined
                }
              />
            </div>
            {errors.phone && (
              <p id={`${id}-phone-error`} className={styles.error} role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "ĐANG TÌM..." : "ĐẶT XE NGAY"}
        </button>
      </form>
    </div>
  );
}
