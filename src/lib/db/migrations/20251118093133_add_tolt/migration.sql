/*
  Warnings:

  - You are about to drop the column `trackdeskCid` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "trackdeskCid",
ADD COLUMN     "toltData" JSONB;
