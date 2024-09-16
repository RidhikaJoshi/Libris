-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('ISSUED', 'PENDING', 'RETURNED', 'LOST');

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "Issue_date" TIMESTAMP(3) NOT NULL,
    "Return_date" TIMESTAMP(3) NOT NULL,
    "Fine" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
