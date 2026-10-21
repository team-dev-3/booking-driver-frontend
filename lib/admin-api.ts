import type {
  AdminLoginResponse,
  BookingListResponse,
  BookingDetailResponse,
  CreateBookingPayload,
  CreateBookingResponse,
  CancelBookingPayload,
  CancelBookingResponse,
} from "@/types/admin";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") || "";
}

async function request<T>(
  path: string,
  options?: RequestInit,
  useAuth = false
): Promise<T> {
  if (!API_URL) {
    throw new Error("Chưa cấu hình NEXT_PUBLIC_API_URL");
  }

  
const headers = new Headers(options?.headers);

if (!headers.has("Content-Type")) {
  headers.set("Content-Type", "application/json");
}

if (useAuth) {
  const token = getToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
}


  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
      credentials: "include"
    });
  } catch {
    throw new Error("Không thể kết nối tới Backend.");
  }

  const data = await response.json().catch(() => null);

  if (!data || typeof data !== "object") {
    throw new Error(`Phản hồi không hợp lệ (${response.status})`);
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Yêu cầu thất bại");
  }

  return data as T;
}

export function adminLogin(phoneNumber: string, password: string) {
  return request<AdminLoginResponse>("/admin/account/login", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, password }),
  });
}

export function getBookingList(params?: {
  page?: number;
  status?: string;
  bookingCode?: string;
  sdt?: string;
}) {
  const search = new URLSearchParams();

  if (params?.page) search.set("page", String(params.page));
  if (params?.status) search.set("status", params.status);
  if (params?.bookingCode) search.set("bookingCode", params.bookingCode);
  if (params?.sdt) search.set("sdt", params.sdt);

  return request<BookingListResponse>(
    `/admin/booking/list?${search.toString()}`,
    { method: "GET" },
    true
  );
}

export function getBookingDetail(id: string | number) {
  return request<BookingDetailResponse>(
    `/admin/booking/detail/${id}`,
    { method: "GET" },
    true
  );
}

export function createBooking(payload: CreateBookingPayload) {
  return request<CreateBookingResponse>(
    `/admin/booking/create`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    true
  );
}

export function cancelBooking(
  id: string | number,
  payload: CancelBookingPayload
) {
  return request<CancelBookingResponse>(
    `/admin/booking/cancel/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    true
  );
}