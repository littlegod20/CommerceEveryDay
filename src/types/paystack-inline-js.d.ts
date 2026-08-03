declare module "@paystack/inline-js" {
  export type PaystackTransactionOptions = {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    reference?: string;
    metadata?: Record<string, unknown>;
    onSuccess?: (transaction: { id: number; reference: string; message: string }) => void;
    onCancel?: () => void;
    onError?: (error: { message: string }) => void;
    onLoad?: (data: { id: number; customer: unknown; accessCode: string }) => void;
  };

  export default class PaystackPop {
    newTransaction(options: PaystackTransactionOptions): void;
  }
}
