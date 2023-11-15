/*
  Warnings:

  - A unique constraint covering the columns `[seatId,eventId,deletedAt]` on the table `ReservationSeats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ReservationSeats_seatId_eventId_key";

-- AlterTable
ALTER TABLE "ReservationSeats" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "ReservationSeats_seatId_eventId_deletedAt_key" ON "ReservationSeats"("seatId", "eventId", "deletedAt");
