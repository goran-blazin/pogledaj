/*
  Warnings:

  - The primary key for the `ReservationSeats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[reservationId,seatId]` on the table `ReservationSeats` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `ReservationSeats` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ReservationSeats" DROP CONSTRAINT "ReservationSeats_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "ReservationSeats_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationSeats_reservationId_seatId_key" ON "ReservationSeats"("reservationId", "seatId");
