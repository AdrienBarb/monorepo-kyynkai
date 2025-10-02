/*
  Warnings:

  - You are about to drop the column `hfLoraPath` on the `ai_girlfriend` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryImageIds` on the `ai_girlfriend` table. All the data in the column will be lost.
  - You are about to drop the column `triggerWords` on the `ai_girlfriend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ai_girlfriend" DROP COLUMN "hfLoraPath",
DROP COLUMN "secondaryImageIds",
DROP COLUMN "triggerWords";
