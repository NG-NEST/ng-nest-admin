/*
  Warnings:

  - You are about to drop the column `jsonSchema` on the `sys-schema-data` table. All the data in the column will be lost.
  - Added the required column `schemaId` to the `sys-schema-data` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sys-schema_code_key";

-- AlterTable
ALTER TABLE "sys-schema" ADD COLUMN     "version" TEXT;

-- AlterTable
ALTER TABLE "sys-schema-data" DROP COLUMN "jsonSchema",
ADD COLUMN     "schemaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sys-schema-data" ADD CONSTRAINT "sys-schema-data_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "sys-schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
