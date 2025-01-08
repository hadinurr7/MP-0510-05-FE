export interface Attendees {
  id: number;
  name: string;
  email: string;
  ticketCount: number;
  totalPrice: number;
  qty: number;
  eventName: string;
    attendees: {
      fullname: string;
      qty: number;
    attendees: {
      name: string;
      email: string;
      qty: number;
      totalPrice: number;
    };
  };
}
