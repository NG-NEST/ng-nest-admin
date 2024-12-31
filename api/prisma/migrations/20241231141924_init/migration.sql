-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('Ready', 'Uploading', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "sys-user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-user-role" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-user-role_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "sys-permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "resourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "sys-permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-resource" (
    "id" TEXT NOT NULL,
    "pid" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sys-resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "sys-subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-role-permission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-role-permission_pkey" PRIMARY KEY ("roleId","permissionId")
);

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

-- CreateTable
CREATE TABLE "sys-language" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "languageCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-schema" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-file" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "actualname" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "status" "FileStatus" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-file_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys-user_name_key" ON "sys-user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-user_account_key" ON "sys-user"("account");

-- CreateIndex
CREATE UNIQUE INDEX "sys-user_phone_key" ON "sys-user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "sys-role_name_key" ON "sys-role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-resource_name_key" ON "sys-resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-resource_code_key" ON "sys-resource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys-subject_name_key" ON "sys-subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-subject_code_key" ON "sys-subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys-schema_code_key" ON "sys-schema"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys-file_key_key" ON "sys-file"("key");

-- AddForeignKey
ALTER TABLE "sys-user-role" ADD CONSTRAINT "sys-user-role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "sys-role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-user-role" ADD CONSTRAINT "sys-user-role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "sys-user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-permission" ADD CONSTRAINT "sys-permission_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "sys-resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-resource" ADD CONSTRAINT "sys-resource_pid_fkey" FOREIGN KEY ("pid") REFERENCES "sys-resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-resource" ADD CONSTRAINT "sys-resource_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "sys-subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-role-permission" ADD CONSTRAINT "sys-role-permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "sys-permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-role-permission" ADD CONSTRAINT "sys-role-permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "sys-role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-dictionary" ADD CONSTRAINT "sys-dictionary_pid_fkey" FOREIGN KEY ("pid") REFERENCES "sys-dictionary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
