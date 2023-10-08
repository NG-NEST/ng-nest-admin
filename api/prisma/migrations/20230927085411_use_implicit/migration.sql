/*
  Warnings:

  - You are about to drop the `sys-user-role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sys-user-role` DROP FOREIGN KEY `sys-user-role_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `sys-user-role` DROP FOREIGN KEY `sys-user-role_userId_fkey`;

-- DropTable
DROP TABLE `sys-user-role`;

-- CreateTable
CREATE TABLE `_RoleToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RoleToUser_AB_unique`(`A`, `B`),
    INDEX `_RoleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys-role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys-user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
