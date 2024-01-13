/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sys-permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `sys-permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `sys-resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `sys-resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `sys-subject` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sys-resource" ALTER COLUMN "pid" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sys-permission_name_key" ON "sys-permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-permission_code_key" ON "sys-permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys-resource_name_key" ON "sys-resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-resource_code_key" ON "sys-resource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys-subject_name_key" ON "sys-subject"("name");
