/*
  Warnings:

  - You are about to drop the column `seatId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_seatId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "seatId";

-- CreateTable
CREATE TABLE "ReservationSeats" (
    "reservationId" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "seatId" UUID NOT NULL,
    "options" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "ReservationSeats_pkey" PRIMARY KEY ("reservationId","seatId")
);

-- CreateIndex
CREATE INDEX "ReservationSeats_reservationId_idx" ON "ReservationSeats"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationSeats_seatId_eventId_key" ON "ReservationSeats"("seatId", "eventId");

CREATE INDEX "Reservation_eventId_idx" ON "Reservation"("eventId");

-- AddForeignKey
ALTER TABLE "ReservationSeats" ADD CONSTRAINT "ReservationSeats_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationSeats" ADD CONSTRAINT "ReservationSeats_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "CinemaSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
