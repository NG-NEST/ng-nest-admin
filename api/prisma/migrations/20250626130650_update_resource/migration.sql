-- AlterTable
ALTER TABLE "sys-catalogue" ADD COLUMN     "many" BOOLEAN,
ADD COLUMN     "variableId" TEXT;

-- AlterTable
ALTER TABLE "sys-resource" ADD COLUMN     "icon" TEXT;

-- AddForeignKey
ALTER TABLE "sys-catalogue" ADD CONSTRAINT "sys-catalogue_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "sys-variable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
