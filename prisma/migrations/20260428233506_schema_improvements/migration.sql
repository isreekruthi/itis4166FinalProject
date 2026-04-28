/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,bookId,status]` on the table `Borrowing` will be added. If there are existing duplicate values, this will fail.
  - Made the column `isbn` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedDate` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_userId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "isbn" SET NOT NULL,
ALTER COLUMN "publishedDate" SET NOT NULL,
ALTER COLUMN "publishedDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Borrowing_userId_bookId_status_key" ON "Borrowing"("userId", "bookId", "status");

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
