-- CreateTable
CREATE TABLE "sys-variable-category" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "sys-variable-category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-variable" (
    "id" TEXT NOT NULL,
    "variableCategoryId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT,
    "value" JSONB,
    "description" TEXT,
    "resourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-variable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sys-variable-category" ADD CONSTRAINT "sys-variable-category_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "sys-resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-variable" ADD CONSTRAINT "sys-variable_variableCategoryId_fkey" FOREIGN KEY ("variableCategoryId") REFERENCES "sys-variable-category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-variable" ADD CONSTRAINT "sys-variable_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "sys-resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
