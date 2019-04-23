export interface Reservation {
  readonly arrivalDate: string;
  readonly departureDate: string;
  readonly hotelName: string;
  readonly id: string;
  readonly name: string;
}

export interface ReservationInput {
  readonly arrivalDate: Date;
  readonly departureDate: Date;
  readonly hotelName: string;
  readonly name: string;
}
