-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SuperAdmin', 'Manager', 'Employee');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "cinemaIds" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
