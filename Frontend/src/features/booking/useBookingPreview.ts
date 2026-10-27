import { useState } from "react";
import type { FormEvent } from "react";
import { fixedBookingRoutes } from "@/data/booking.mock";
import { isValidPhone, validateSearchForm } from "@/utils/validation";

export interface BookingDraft {
  mode: "shared" | "private";
  route: string;
  seats: string;
  pickup: string;
  destination: string;
  name: string;
  phone: string;
  vehicle: string;
  departure: string;
  returnDeparture: string;
  direction: string;
  invoice: boolean;
}

const initialDraft: BookingDraft = {
  mode: "shared",
  route: "",
  seats: "",
  pickup: "",
  destination: "",
  name: "",
  phone: "",
  vehicle: "4",
  departure: "",
  returnDeparture: "",
  direction: "oneway",
  invoice: false,
};

export function useBookingPreview() {
  const [draft, setDraft] = useState(initialDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<BookingDraft>();
  function change<K extends keyof BookingDraft>(
    field: K,
    value: BookingDraft[K],
  ) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: "", ...(field === "mode" ? { seats: "" } : {}) }));
    setPreview(undefined);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    const validation = validateSearchForm({
      from: draft.pickup,
      to: draft.destination,
      date: draft.departure.slice(0, 10),
      time: draft.departure.slice(11, 16),
    });
    const fields: Record<string, string> = {
      from: "pickup",
      to: "destination",
      date: "departure",
      time: "departure",
    };
    for (const [field, result] of Object.entries(validation))
      if (!result.valid && result.message && !nextErrors[fields[field]])
        nextErrors[fields[field]] = result.message;
    if (draft.name.trim().length < 2)
      nextErrors.name = "Vui lòng nhập họ tên đầy đủ";
    if (!isValidPhone(draft.phone))
      nextErrors.phone = "Số điện thoại Việt Nam không hợp lệ";
    if (
      draft.direction === "roundtrip" &&
      (!draft.returnDeparture || draft.returnDeparture < draft.departure)
    )
      nextErrors.returnDeparture = "Thời gian về phải từ thời gian đi trở đi";
    if (!fixedBookingRoutes.includes(draft.route))
      nextErrors.route = "Vui lòng chọn tuyến đường cố định";
    if (draft.mode === "shared" &&
      (!Number.isInteger(Number(draft.seats)) || Number(draft.seats) < 1 || Number(draft.seats) > Number(draft.vehicle)))
      nextErrors.seats = "Chọn số ghế từ 1 đến số chỗ của xe";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const form = event.currentTarget;
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setPreview({ ...draft });
  }
  return { draft, errors, preview, change, submit };
}
