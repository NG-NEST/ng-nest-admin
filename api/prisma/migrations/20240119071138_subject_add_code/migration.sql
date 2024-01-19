/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `sys-subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `sys-subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sys-subject" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sys-subject_code_key" ON "sys-subject"("code");
