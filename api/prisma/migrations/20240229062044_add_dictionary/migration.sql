-- CreateTable
CREATE TABLE "sys-dictionary" (
    "id" TEXT NOT NULL,
    "pid" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-dictionary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sys-dictionary" ADD CONSTRAINT "sys-dictionary_pid_fkey" FOREIGN KEY ("pid") REFERENCES "sys-dictionary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
