/*
  Warnings:

  - A unique constraint covering the columns `[position,cinemaTheaterId]` on the table `CinemaSeatGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CinemaSeatGroupPositionEnum" AS ENUM ('TopLeft', 'TopCenter', 'TopRight', 'CenterLeft', 'Center', 'CenterRight', 'BottomLeft', 'BottomCenter', 'BottomRight');

-- AlterTable
ALTER TABLE "CinemaSeatGroup" ADD COLUMN     "options" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "position" "CinemaSeatGroupPositionEnum" NOT NULL DEFAULT 'Center';

-- CreateIndex
CREATE UNIQUE INDEX "CinemaSeatGroup_position_cinemaTheaterId_key" ON "CinemaSeatGroup"("position", "cinemaTheaterId");
