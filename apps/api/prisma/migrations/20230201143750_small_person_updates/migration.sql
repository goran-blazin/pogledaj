/*
  Warnings:

  - You are about to drop the column `countryOfOriginId` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Person` table. All the data in the column will be lost.
  - Added the required column `name` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_countryOfOriginId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "countryOfOriginId",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
ADD COLUMN     "name" TEXT NOT NULL;
