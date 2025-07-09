-- AlterTable
ALTER TABLE "sys-variable" ADD COLUMN     "source" TEXT;

-- CreateTable
CREATE TABLE "sys-model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-prompt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "system" TEXT,
    "user" TEXT NOT NULL,
    "userVars" JSONB,
    "modelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-prompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sys-prompt" ADD CONSTRAINT "sys-prompt_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "sys-model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
