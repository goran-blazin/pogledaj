export type Reservation = {
  id: string; // uuid
  eventId: string; // uuid, references MovieProjection
  customerInformation: {
    name?: string;
    phone?: string;
    email?: string;
  }; // jsonb
  createdAt: Date; // timestamp without time zone
  updatedAt: Date | null; // timestamp without time zone, nullable
  options: Record<string, unknown>; // jsonb
  reservationSeats: ReservationSeats[];
};

interface ReservationSeats {
  reservationId: string; // uuid, references Reservation
  eventId: string; // uuid, not null
  seatId: string; // uuid, references CinemaSeat
  options: Record<string, unknown>; // jsonb
}
