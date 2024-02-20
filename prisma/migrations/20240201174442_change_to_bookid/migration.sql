/*
  Warnings:

  - You are about to drop the column `bookISBN` on the `library` table. All the data in the column will be lost.
  - You are about to drop the column `bookISBN` on the `readlist` table. All the data in the column will be lost.
  - You are about to drop the column `bookISBN` on the `wishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `library` DROP COLUMN `bookISBN`,
    ADD COLUMN `bookId` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `readlist` DROP COLUMN `bookISBN`,
    ADD COLUMN `bookId` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `wishlist` DROP COLUMN `bookISBN`,
    ADD COLUMN `bookId` VARCHAR(191) NOT NULL DEFAULT '';
