/*
  Warnings:

  - The primary key for the `sys-role-permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissionId` on the `sys-role-permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `sys-permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permissionCode` to the `sys-role-permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sys-role-permission" DROP CONSTRAINT "sys-role-permission_permissionId_fkey";

-- AlterTable
ALTER TABLE "sys-role-permission" DROP CONSTRAINT "sys-role-permission_pkey",
DROP COLUMN "permissionId",
ADD COLUMN     "permissionCode" TEXT NOT NULL,
ADD CONSTRAINT "sys-role-permission_pkey" PRIMARY KEY ("roleId", "permissionCode");

-- CreateIndex
CREATE UNIQUE INDEX "sys-permission_code_key" ON "sys-permission"("code");

-- AddForeignKey
ALTER TABLE "sys-role-permission" ADD CONSTRAINT "sys-role-permission_permissionCode_fkey" FOREIGN KEY ("permissionCode") REFERENCES "sys-permission"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
