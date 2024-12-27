/*
  Warnings:

  - The primary key for the `sys-role-permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissionCode` on the `sys-role-permission` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `sys-role-permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sys-role-permission" DROP CONSTRAINT "sys-role-permission_permissionCode_fkey";

-- DropIndex
DROP INDEX "sys-permission_code_key";

-- AlterTable
ALTER TABLE "sys-role-permission" DROP CONSTRAINT "sys-role-permission_pkey",
DROP COLUMN "permissionCode",
ADD COLUMN     "permissionId" TEXT NOT NULL,
ADD CONSTRAINT "sys-role-permission_pkey" PRIMARY KEY ("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "sys-role-permission" ADD CONSTRAINT "sys-role-permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "sys-permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
