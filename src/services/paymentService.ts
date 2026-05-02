import api from "./api";

export interface PaymentPayload {
  appointmentId?: string;
  doctorId: string;
  amount: number; // total in INR
  method: "card" | "upi" | "wallet" | "netbanking";
  meta?: Record<string, unknown>;
}

export interface PaymentResult {
  id: string;
  status: "success" | "failed" | "pending";
  receiptUrl?: string;
}

export const paymentService = {
  /** POST /payments */
  pay: async (payload: PaymentPayload): Promise<PaymentResult> => {
    const { data } = await api.post<PaymentResult>("/payments", payload);
    return data;
  },

  /** GET /payments/:id */
  status: async (id: string): Promise<PaymentResult> => {
    const { data } = await api.get<PaymentResult>(`/payments/${id}`);
    return data;
  },
};
