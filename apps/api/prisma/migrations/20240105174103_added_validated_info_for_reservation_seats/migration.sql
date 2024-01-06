-- AlterTable
ALTER TABLE "ReservationSeats" ADD COLUMN     "validatedAt" TIMESTAMP(3),
ADD COLUMN     "validatedByAdminUserId" UUID;

-- AddForeignKey
ALTER TABLE "ReservationSeats" ADD CONSTRAINT "ReservationSeats_validatedByAdminUserId_fkey" FOREIGN KEY ("validatedByAdminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
