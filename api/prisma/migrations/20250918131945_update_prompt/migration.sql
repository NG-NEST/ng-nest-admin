/*
  Warnings:

  - You are about to drop the column `modelCode` on the `sys-prompt` table. All the data in the column will be lost.
  - Added the required column `code` to the `sys-prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sys-prompt" DROP CONSTRAINT "sys-prompt_modelCode_fkey";

-- AlterTable
ALTER TABLE "sys-prompt" DROP COLUMN "modelCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sys-prompt" ADD CONSTRAINT "sys-prompt_code_fkey" FOREIGN KEY ("code") REFERENCES "sys-model"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
