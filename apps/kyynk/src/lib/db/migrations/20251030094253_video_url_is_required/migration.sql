/*
  Warnings:

  - Made the column `videoUrl` on table `Fantasy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoUrl` on table `FantasyChoice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Fantasy" ALTER COLUMN "videoUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "FantasyChoice" ALTER COLUMN "videoUrl" SET NOT NULL;
