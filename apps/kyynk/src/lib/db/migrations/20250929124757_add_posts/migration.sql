/*
  Warnings:

  - You are about to drop the `story` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MediaVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- DropForeignKey
ALTER TABLE "story" DROP CONSTRAINT "story_aiGirlfriendId_fkey";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC';

-- DropTable
DROP TABLE "story";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "aiGirlfriendId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_aiGirlfriendId_idx" ON "Post"("aiGirlfriendId");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- CreateIndex
CREATE INDEX "Post_mediaId_idx" ON "Post"("mediaId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_aiGirlfriendId_fkey" FOREIGN KEY ("aiGirlfriendId") REFERENCES "ai_girlfriend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
