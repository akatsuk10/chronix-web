-- CreateTable
CREATE TABLE "WaitlistEntry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_name_key" ON "WaitlistEntry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_wallet_key" ON "WaitlistEntry"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_telegram_key" ON "WaitlistEntry"("telegram");
