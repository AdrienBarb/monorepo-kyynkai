-- CreateEnum
CREATE TYPE "CreditSaleType" AS ENUM ('CHAT', 'MEDIA');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "originGuestId" TEXT;

-- CreateTable
CREATE TABLE "CreditSale" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CreditSaleType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditSale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditSale" ADD CONSTRAINT "CreditSale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
