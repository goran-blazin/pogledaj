-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('Normal');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('RSD', 'USD', 'EUR', 'CHF');

-- CreateTable
CREATE TABLE "ProjectionPrice" (
    "projectionId" UUID NOT NULL,
    "groupId" UUID NOT NULL,
    "type" "PriceType" NOT NULL DEFAULT 'Normal',
    "price" DECIMAL NOT NULL,
    "currencyCode" "CurrencyCode" NOT NULL,

    CONSTRAINT "ProjectionPrice_pkey" PRIMARY KEY ("projectionId","groupId")
);

-- AddForeignKey
ALTER TABLE "ProjectionPrice" ADD CONSTRAINT "ProjectionPrice_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CinemaSeatGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
