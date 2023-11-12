-- CreateTable
CREATE TABLE "Reservation" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "seatId" UUID NOT NULL,
    "customerInformation" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "options" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "MovieProjection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "CinemaSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
