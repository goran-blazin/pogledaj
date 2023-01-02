/*
  Warnings:

  - You are about to drop the column `dubbedLanguageId` on the `Movie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_dubbedLanguageId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "dubbedLanguageId";

-- CreateTable
CREATE TABLE "MovieCinemaOverride" (
    "movieId" UUID NOT NULL,
    "cinemaId" UUID NOT NULL,
    "movieDataOverrides" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieCinemaOverride_pkey" PRIMARY KEY ("movieId","cinemaId")
);

-- CreateTable
CREATE TABLE "MovieProjection" (
    "id" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "cinemaTheaterId" UUID NOT NULL,
    "projectionDateTime" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dubbedLanguageId" TEXT,
    "options" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "MovieProjection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieCinemaOverride" ADD CONSTRAINT "MovieCinemaOverride_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCinemaOverride" ADD CONSTRAINT "MovieCinemaOverride_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProjection" ADD CONSTRAINT "MovieProjection_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProjection" ADD CONSTRAINT "MovieProjection_cinemaTheaterId_fkey" FOREIGN KEY ("cinemaTheaterId") REFERENCES "CinemaTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProjection" ADD CONSTRAINT "MovieProjection_dubbedLanguageId_fkey" FOREIGN KEY ("dubbedLanguageId") REFERENCES "Language"("code") ON DELETE SET NULL ON UPDATE CASCADE;
