/*
  Warnings:

  - You are about to drop the column `bookISBN` on the `timeline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `timeline` DROP COLUMN `bookISBN`,
    ADD COLUMN `bookId` VARCHAR(191) NOT NULL DEFAULT '';
