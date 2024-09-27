/*
  Warnings:

  - Added the required column `bookAuthor` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookName` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "bookAuthor" TEXT NOT NULL,
ADD COLUMN     "bookName" TEXT NOT NULL;
