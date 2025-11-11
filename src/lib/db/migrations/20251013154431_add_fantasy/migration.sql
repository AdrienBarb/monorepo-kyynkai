-- CreateTable
CREATE TABLE "Fantasy" (
    "id" TEXT NOT NULL,
    "aiGirlfriendId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fantasy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyStep" (
    "id" TEXT NOT NULL,
    "fantasyId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "FantasyStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyChoice" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "nextStepId" TEXT,
    "cost" INTEGER,

    CONSTRAINT "FantasyChoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fantasy_aiGirlfriendId_idx" ON "Fantasy"("aiGirlfriendId");

-- CreateIndex
CREATE INDEX "Fantasy_isActive_idx" ON "Fantasy"("isActive");

-- CreateIndex
CREATE INDEX "FantasyStep_fantasyId_idx" ON "FantasyStep"("fantasyId");

-- CreateIndex
CREATE INDEX "FantasyStep_order_idx" ON "FantasyStep"("order");

-- CreateIndex
CREATE INDEX "FantasyChoice_stepId_idx" ON "FantasyChoice"("stepId");

-- AddForeignKey
ALTER TABLE "Fantasy" ADD CONSTRAINT "Fantasy_aiGirlfriendId_fkey" FOREIGN KEY ("aiGirlfriendId") REFERENCES "ai_girlfriend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyStep" ADD CONSTRAINT "FantasyStep_fantasyId_fkey" FOREIGN KEY ("fantasyId") REFERENCES "Fantasy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyChoice" ADD CONSTRAINT "FantasyChoice_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "FantasyStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
