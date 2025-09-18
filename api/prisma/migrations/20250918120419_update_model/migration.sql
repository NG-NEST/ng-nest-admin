/*
  Warnings:

  - You are about to drop the column `type` on the `sys-model` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `sys-prompt` table. All the data in the column will be lost.
  - You are about to drop the column `modelType` on the `sys-prompt` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `sys-prompt` table. All the data in the column will be lost.
  - You are about to drop the column `userVars` on the `sys-prompt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `sys-model` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `sys-model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `sys-model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelCode` to the `sys-prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `sys-prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `sys-prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sys-prompt" DROP CONSTRAINT "sys-prompt_modelId_fkey";

-- AlterTable
ALTER TABLE "sys-model" DROP COLUMN "type",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sys-prompt" DROP COLUMN "modelId",
DROP COLUMN "modelType",
DROP COLUMN "user",
DROP COLUMN "userVars",
ADD COLUMN     "modelCode" TEXT NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "promptVars" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "sys-model_code_key" ON "sys-model"("code");

-- AddForeignKey
ALTER TABLE "sys-prompt" ADD CONSTRAINT "sys-prompt_modelCode_fkey" FOREIGN KEY ("modelCode") REFERENCES "sys-model"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
