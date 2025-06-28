-- CreateTable
CREATE TABLE "sys-icon" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-icon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys-icon_name_key" ON "sys-icon"("name");

-- AddForeignKey
ALTER TABLE "sys-icon" ADD CONSTRAINT "sys-icon_type_fkey" FOREIGN KEY ("type") REFERENCES "sys-resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
