-- AlterTable
ALTER TABLE "sys-schema" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "sys-schema-data" (
    "id" TEXT NOT NULL,
    "jsonSchema" JSONB NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-schema-data_pkey" PRIMARY KEY ("id")
);
