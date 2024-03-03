-- CreateTable
CREATE TABLE "sys-language" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "languageCode" TEXT NOT NULL,

    CONSTRAINT "sys-language_pkey" PRIMARY KEY ("id")
);
