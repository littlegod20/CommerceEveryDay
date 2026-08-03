const PAYSTACK_BASE_URL = "https://api.paystack.co";

export type PaystackVerifyResult = {
  status: string;
  amount: number;
  currency: string;
  reference: string;
};

export async function verifyPaystackTransaction(reference: string): Promise<PaystackVerifyResult> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not set.");
  }

  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: "no-store",
    },
  );

  const body = await response.json();
  if (!response.ok || !body.status) {
    throw new Error(body.message ?? `Paystack verify request failed with status ${response.status}`);
  }

  return {
    status: body.data.status,
    amount: body.data.amount,
    currency: body.data.currency,
    reference: body.data.reference,
  };
}
