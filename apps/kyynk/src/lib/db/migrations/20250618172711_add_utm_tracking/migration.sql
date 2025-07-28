-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "availableDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "utmTracking" JSONB,
ALTER COLUMN "feeFreeUntil" SET DEFAULT now() + interval '3 months';

-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expireOn" SET DEFAULT now() + interval '24 hours';
