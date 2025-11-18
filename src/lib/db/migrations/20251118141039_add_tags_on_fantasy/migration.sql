-- AlterTable
ALTER TABLE "Fantasy" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
