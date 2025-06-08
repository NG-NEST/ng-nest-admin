-- CreateEnum
CREATE TYPE "CatalogueFileType" AS ENUM ('Media', 'Text');

-- AlterTable
ALTER TABLE "sys-catalogue" ADD COLUMN     "fileType" "CatalogueFileType";
