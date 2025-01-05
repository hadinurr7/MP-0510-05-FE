export interface Voucher {
    id: number;
    voucherCode: string;
    qty: number;
    value: number;
    validUntill: Date;
    event: {
      id: number;
      name: string;
    };
  }