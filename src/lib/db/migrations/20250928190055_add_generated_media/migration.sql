/*
  Warnings:

  - You are about to drop the `media_proposal` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GenerationStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterEnum
ALTER TYPE "CreditSaleType" ADD VALUE 'NUDE';

-- DropForeignKey
ALTER TABLE "media_proposal" DROP CONSTRAINT "media_proposal_aiGirlfriendId_fkey";

-- DropIndex
DROP INDEX "Message_mediaId_idx";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "generatedMediaId" TEXT;

-- AlterTable
ALTER TABLE "ai_girlfriend" ADD COLUMN     "hfLoraPath" TEXT,
ADD COLUMN     "triggerWords" TEXT,
ADD COLUMN     "version" TEXT NOT NULL DEFAULT 'v1';

-- DropTable
DROP TABLE "media_proposal";

-- CreateTable
CREATE TABLE "GeneratedMedia" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "status" "GenerationStatus" NOT NULL DEFAULT 'PENDING',
    "mediaKey" TEXT,
    "externalId" TEXT,
    "userId" TEXT NOT NULL,
    "conversationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeneratedMedia_userId_idx" ON "GeneratedMedia"("userId");

-- CreateIndex
CREATE INDEX "GeneratedMedia_status_idx" ON "GeneratedMedia"("status");

-- CreateIndex
CREATE INDEX "GeneratedMedia_externalId_idx" ON "GeneratedMedia"("externalId");

-- CreateIndex
CREATE INDEX "GeneratedMedia_conversationId_idx" ON "GeneratedMedia"("conversationId");

-- CreateIndex
CREATE INDEX "Message_generatedMediaId_idx" ON "Message"("generatedMediaId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_generatedMediaId_fkey" FOREIGN KEY ("generatedMediaId") REFERENCES "GeneratedMedia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedMedia" ADD CONSTRAINT "GeneratedMedia_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
