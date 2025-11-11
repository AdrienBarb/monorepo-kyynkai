-- CreateTable
CREATE TABLE "media_proposal" (
    "id" TEXT NOT NULL,
    "aiGirlfriendId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mediaKey" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "creditCost" INTEGER NOT NULL DEFAULT 1,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_proposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "media_proposal" ADD CONSTRAINT "media_proposal_aiGirlfriendId_fkey" FOREIGN KEY ("aiGirlfriendId") REFERENCES "ai_girlfriend"("id") ON DELETE CASCADE ON UPDATE CASCADE;
