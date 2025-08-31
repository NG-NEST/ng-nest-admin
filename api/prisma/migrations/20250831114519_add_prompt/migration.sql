/*
  Warnings:

  - You are about to drop the column `userVars` on the `sys-prompt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sys-prompt" DROP COLUMN "userVars";

-- CreateTable
CREATE TABLE "sys-prompt-user-vars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT,
    "description" TEXT,
    "PromptId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-prompt-user-vars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sys-prompt-user-vars" ADD CONSTRAINT "sys-prompt-user-vars_PromptId_fkey" FOREIGN KEY ("PromptId") REFERENCES "sys-prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
