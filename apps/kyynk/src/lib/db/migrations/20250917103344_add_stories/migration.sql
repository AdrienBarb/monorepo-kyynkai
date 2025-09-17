-- CreateTable
CREATE TABLE "story" (
    "id" TEXT NOT NULL,
    "aiGirlfriendId" TEXT NOT NULL,
    "mediaKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "story_aiGirlfriendId_idx" ON "story"("aiGirlfriendId");

-- AddForeignKey
ALTER TABLE "story" ADD CONSTRAINT "story_aiGirlfriendId_fkey" FOREIGN KEY ("aiGirlfriendId") REFERENCES "ai_girlfriend"("id") ON DELETE CASCADE ON UPDATE CASCADE;
