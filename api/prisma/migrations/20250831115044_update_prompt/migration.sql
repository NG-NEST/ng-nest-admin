/*
  Warnings:

  - You are about to drop the `sys-prompt-user-vars` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userVars` to the `sys-prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sys-prompt-user-vars" DROP CONSTRAINT "sys-prompt-user-vars_PromptId_fkey";

-- AlterTable
ALTER TABLE "sys-prompt" ADD COLUMN     "userVars" JSONB NOT NULL;

-- DropTable
DROP TABLE "sys-prompt-user-vars";
