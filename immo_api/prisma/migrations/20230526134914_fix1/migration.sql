/*
  Warnings:

  - You are about to drop the column `pandId` on the `TypePand` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[typePandId]` on the table `Pand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `typePandId` to the `Pand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TypePand` DROP FOREIGN KEY `TypePand_pandId_fkey`;

-- AlterTable
ALTER TABLE `Pand` ADD COLUMN `typePandId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TypePand` DROP COLUMN `pandId`;

-- CreateIndex
CREATE UNIQUE INDEX `Pand_typePandId_key` ON `Pand`(`typePandId`);

-- AddForeignKey
ALTER TABLE `Pand` ADD CONSTRAINT `Pand_typePandId_fkey` FOREIGN KEY (`typePandId`) REFERENCES `TypePand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
