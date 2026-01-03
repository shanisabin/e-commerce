import { apiFetch } from "@/lib/api";

export interface VerifyOtpResponse {
  otp: string;
  user: boolean;
  token?: {
    access: string;
  };
}

export interface RegisterPayload {
  name: string;
  phone_number: string;
  unique_id?: string;
}

export interface RegisterResponse {
  token: {
    access: string;
  };
  user_id: string;
  name: string;
  phone_number: string;
  message: string;
}


export const verifyOtp = (phone: string): Promise<VerifyOtpResponse> => {
  return apiFetch("/api/verify/", {
    method: "POST",
    body: JSON.stringify({ phone_number: phone }),
  });
};

export const registerUser = (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  return apiFetch("/api/login-register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
