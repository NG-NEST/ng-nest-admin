/*
  Warnings:

  - Added the required column `type` to the `sys-catalogue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CatalogueType" AS ENUM ('Folder', 'File');

-- AlterTable
ALTER TABLE "sys-catalogue" ADD COLUMN     "type" "CatalogueType" NOT NULL;
