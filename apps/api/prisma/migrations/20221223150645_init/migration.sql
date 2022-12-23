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
    "theaterId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rowCount" INTEGER NOT NULL,
    "columnCount" INTEGER NOT NULL,

    CONSTRAINT "CinemaSeatGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinemaSeat" (
    "id" UUID NOT NULL,
    "seatGroupId" UUID NOT NULL,
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
    "genreId" TEXT NOT NULL,
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
    "dateOfBirth" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "personId" UUID NOT NULL,
    "projectionId" UUID NOT NULL,
    "projectionType" "ProjectionType" NOT NULL,
    "role" "ActorRoleType" NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("personId","projectionId")
);

-- CreateTable
CREATE TABLE "Director" (
    "personId" UUID NOT NULL,
    "projectionId" UUID NOT NULL,
    "projectionType" "ProjectionType" NOT NULL,
    "type" "DirectorType" NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("personId","projectionId")
);

-- CreateTable
CREATE TABLE "Producer" (
    "personId" UUID NOT NULL,
    "projectionId" UUID NOT NULL,
    "projectionType" "ProjectionType" NOT NULL,
    "type" "ProducerType" NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("personId","projectionId")
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
