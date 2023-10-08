/*
  Warnings:

  - You are about to drop the column `subject` on the `sys-resource` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `sys-role` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `sys-resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `sys-role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sys-resource` DROP COLUMN `subject`,
    ADD COLUMN `subjectId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sys-role` DROP COLUMN `code`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `sys-subject` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys-resource` ADD CONSTRAINT `sys-resource_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `sys-subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
