-- DropIndex
DROP INDEX "sys-permission_code_key";

-- DropIndex
DROP INDEX "sys-permission_name_key";

-- AlterTable
ALTER TABLE "sys-permission" ADD COLUMN     "description" TEXT,
ALTER COLUMN "sort" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "sys-resource" ADD COLUMN     "description" TEXT,
ADD COLUMN     "sort" INTEGER NOT NULL DEFAULT 0;
