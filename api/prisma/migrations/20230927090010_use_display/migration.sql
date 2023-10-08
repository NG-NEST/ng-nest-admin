/*
  Warnings:

  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RoleToUser` DROP FOREIGN KEY `_RoleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RoleToUser` DROP FOREIGN KEY `_RoleToUser_B_fkey`;

-- DropTable
DROP TABLE `_RoleToUser`;

-- CreateTable
CREATE TABLE `sys-user-role` (
    `userId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys-user-role` ADD CONSTRAINT `sys-user-role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sys-user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys-user-role` ADD CONSTRAINT `sys-user-role_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `sys-role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
