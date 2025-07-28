/*
  Warnings:

  - You are about to drop the column `nudeId` on the `Message` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageAttachmentType" AS ENUM ('nude', 'voice', 'tip');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_nudeId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "nudeId";

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "availableDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "feeFreeUntil" SET DEFAULT now() + interval '3 months';

-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expireOn" SET DEFAULT now() + interval '24 hours';

-- CreateTable
CREATE TABLE "MessageAttachment" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "type" "MessageAttachmentType" NOT NULL,
    "nudeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageAttachment_messageId_key" ON "MessageAttachment"("messageId");

-- AddForeignKey
ALTER TABLE "MessageAttachment" ADD CONSTRAINT "MessageAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageAttachment" ADD CONSTRAINT "MessageAttachment_nudeId_fkey" FOREIGN KEY ("nudeId") REFERENCES "Nude"("id") ON DELETE SET NULL ON UPDATE CASCADE;
