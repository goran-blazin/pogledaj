/*
  Warnings:

  - You are about to drop the column `localizedName` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `MovieActor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId,externalType]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId,externalType]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalType` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizedPlot` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizedTitle` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `castOrder` to the `MovieActor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterName` to the `MovieActor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalType` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InputProvider" AS ENUM ('Tmdb', 'Imdb', 'AdminInput');

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "localizedName",
DROP COLUMN "originalName",
ADD COLUMN     "additionalData" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "externalType" "InputProvider" NOT NULL,
ADD COLUMN     "localizedPlot" TEXT NOT NULL,
ADD COLUMN     "localizedTitle" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MovieActor" DROP COLUMN "role",
ADD COLUMN     "castOrder" INTEGER NOT NULL,
ADD COLUMN     "characterName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "additionalData" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "externalType" "InputProvider" NOT NULL;

-- DropEnum
DROP TYPE "ActorRoleType";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_externalId_externalType_key" ON "Movie"("externalId", "externalType");

-- CreateIndex
CREATE UNIQUE INDEX "Person_externalId_externalType_key" ON "Person"("externalId", "externalType");
