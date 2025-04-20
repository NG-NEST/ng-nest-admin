-- CreateTable
CREATE TABLE "sys-catalogue" (
    "id" TEXT NOT NULL,
    "pid" TEXT,
    "name" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sys-catalogue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sys-catalogue" ADD CONSTRAINT "sys-catalogue_pid_fkey" FOREIGN KEY ("pid") REFERENCES "sys-catalogue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-catalogue" ADD CONSTRAINT "sys-catalogue_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "sys-subject"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
