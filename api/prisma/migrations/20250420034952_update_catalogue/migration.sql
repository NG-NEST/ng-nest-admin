/*
  Warnings:

  - You are about to drop the column `categoryCode` on the `sys-catalogue` table. All the data in the column will be lost.
  - Added the required column `resourceId` to the `sys-catalogue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sys-catalogue" DROP CONSTRAINT "sys-catalogue_categoryCode_fkey";

-- AlterTable
ALTER TABLE "sys-catalogue" DROP COLUMN "categoryCode",
ADD COLUMN     "resourceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sys-catalogue" ADD CONSTRAINT "sys-catalogue_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "sys-resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
