/*
  Warnings:

  - Added the required column `modelType` to the `sys-prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sys-prompt" ADD COLUMN     "modelType" TEXT NOT NULL;
