-- CreateTable
CREATE TABLE "FantasyChoiceUnlock" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "choiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FantasyChoiceUnlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FantasyChoiceUnlock_userId_idx" ON "FantasyChoiceUnlock"("userId");

-- CreateIndex
CREATE INDEX "FantasyChoiceUnlock_choiceId_idx" ON "FantasyChoiceUnlock"("choiceId");

-- CreateIndex
CREATE UNIQUE INDEX "FantasyChoiceUnlock_userId_choiceId_key" ON "FantasyChoiceUnlock"("userId", "choiceId");

-- AddForeignKey
ALTER TABLE "FantasyChoiceUnlock" ADD CONSTRAINT "FantasyChoiceUnlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyChoiceUnlock" ADD CONSTRAINT "FantasyChoiceUnlock_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "FantasyChoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
