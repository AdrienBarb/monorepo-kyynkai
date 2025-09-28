/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_mediaId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "mediaId";
