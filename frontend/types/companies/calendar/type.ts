export type History = {
  mId: string;
  transactionKey: string;
  paymentKey: string;
  orderId: string;
  method: string;
  customerKey: string;
  useEscrow: boolean;
  receiptUrl: string;
  status: string;
  transactionAt: string;
  currency: string;
  amount: number;
};

export type Order = {
  mId: string;
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  taxExemptionAmount: number;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean;
  card: null;
  virtualAccount: null;
  transfer: null;
  mobilePhone: null;
  giftCertificate: null;
  cashReceipt: null;
  cashReceipts: null;
  discount: null;
  cancels: null;
  secret: null;
  type: string;
  easyPay: {
    provider: string;
    amount: number;
    discountAmount: number;
  };
  country: string;
  failure: null;
  isPartialCancelable: boolean;
  receipt: {
    url: string;
  };
  checkout: {
    url: string;
  };
  currency: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  method: string;
  version: string;
};
