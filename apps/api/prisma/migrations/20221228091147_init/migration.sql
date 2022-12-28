-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "ActorRoleType" AS ENUM ('Main', 'Supporting', 'Extra', 'Cameo');

-- CreateEnum
CREATE TYPE "DirectorType" AS ENUM ('Main', 'Assistant');

-- CreateEnum
CREATE TYPE "ProducerType" AS ENUM ('Executive', 'Assistant');

-- CreateEnum
CREATE TYPE "ProjectionType" AS ENUM ('Movie', 'TheaterPlay');

-- CreateTable
CREATE TABLE "Genre" (
    "systemName" TEXT NOT NULL,
    "localizedName" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("systemName")
);

-- CreateTable
CREATE TABLE "Language" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Country" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "City" (
    "id" UUID NOT NULL,
    "cityCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cityId" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "phone" JSONB NOT NULL DEFAULT '[]',
    "posterImages" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinemaTheater" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cinemaId" UUID NOT NULL,
    "supports3D" BOOLEAN NOT NULL DEFAULT false,
    "posterImages" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "CinemaTheater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinemaSeatGroup" (
    "id" UUID NOT NULL,
    "cinemaTheaterId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rowCount" INTEGER NOT NULL,
    "columnCount" INTEGER NOT NULL,

    CONSTRAINT "CinemaSeatGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinemaSeat" (
    "id" UUID NOT NULL,
    "cinemaSeatGroupId" UUID NOT NULL,
    "seatRow" TEXT NOT NULL,
    "seatColumn" TEXT NOT NULL,
    "options" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "CinemaSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL,
    "originalName" TEXT NOT NULL,
    "localizedName" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "runtimeMinutes" INTEGER NOT NULL,
    "originalLanguageId" TEXT NOT NULL,
    "dubbedLanguageId" TEXT,
    "countryOfOriginId" TEXT NOT NULL,
    "posterImages" JSONB NOT NULL DEFAULT '[]',
    "rating" INTEGER NOT NULL,
    "releaseDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" UUID NOT NULL,
    "countryOfOriginId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATE,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieActor" (
    "personId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "role" "ActorRoleType" NOT NULL,

    CONSTRAINT "MovieActor_pkey" PRIMARY KEY ("personId","movieId")
);

-- CreateTable
CREATE TABLE "MovieDirector" (
    "personId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "type" "DirectorType" NOT NULL,

    CONSTRAINT "MovieDirector_pkey" PRIMARY KEY ("personId","movieId")
);

-- CreateTable
CREATE TABLE "MovieProducer" (
    "personId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "type" "ProducerType" NOT NULL,

    CONSTRAINT "MovieProducer_pkey" PRIMARY KEY ("personId","movieId")
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_localizedName_key" ON "Genre"("localizedName");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_cityCode_countryCode_key" ON "City"("cityCode", "countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "Cinema_name_key" ON "Cinema"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaTheater" ADD CONSTRAINT "CinemaTheater_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSeatGroup" ADD CONSTRAINT "CinemaSeatGroup_cinemaTheaterId_fkey" FOREIGN KEY ("cinemaTheaterId") REFERENCES "CinemaTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSeat" ADD CONSTRAINT "CinemaSeat_cinemaSeatGroupId_fkey" FOREIGN KEY ("cinemaSeatGroupId") REFERENCES "CinemaSeatGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_originalLanguageId_fkey" FOREIGN KEY ("originalLanguageId") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_dubbedLanguageId_fkey" FOREIGN KEY ("dubbedLanguageId") REFERENCES "Language"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_countryOfOriginId_fkey" FOREIGN KEY ("countryOfOriginId") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_countryOfOriginId_fkey" FOREIGN KEY ("countryOfOriginId") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProducer" ADD CONSTRAINT "MovieProducer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProducer" ADD CONSTRAINT "MovieProducer_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("systemName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
