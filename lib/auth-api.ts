
export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  phoneNumber: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || ""
).replace(/\/$/, "");

async function postAuth(
  path: string,
  body: LoginRequest | RegisterRequest
): Promise<ApiResponse> {
  if (!API_URL) {
    throw new Error("Chưa cấu hình NEXT_PUBLIC_API_URL");
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include"
    });
  } catch {
    throw new Error(
      "Không thể kết nối Backend. Hãy kiểm tra server và CORS."
    );
  }

  const data: unknown = await response.json().catch(() => null);

  if (!data || typeof data !== "object") {
    throw new Error(`Backend trả dữ liệu không hợp lệ (${response.status})`);
  }

  const result = data as Partial<ApiResponse>;

  if (!response.ok || result.success !== true) {
    throw new Error(
      typeof result.message === "string"
        ? result.message
        : "Yêu cầu không thành công"
    );
  }

  return {
    success: true,
    message: result.message || "Thao tác thành công",
    token: result.token,
  };
}

export function loginCustomer(payload: LoginRequest) {
  return postAuth("/customer/account/login", payload);
}

export function registerCustomer(payload: RegisterRequest) {
  return postAuth("/customer/account/register", payload);
}
