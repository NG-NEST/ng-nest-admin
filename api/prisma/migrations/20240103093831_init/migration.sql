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
    "sort" INTEGER NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-resource" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "sys-subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys-user_name_key" ON "sys-user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys-user_account_key" ON "sys-user"("account");

-- CreateIndex
CREATE UNIQUE INDEX "sys-user_phone_key" ON "sys-user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "sys-role_name_key" ON "sys-role"("name");

-- AddForeignKey
ALTER TABLE "sys-user-role" ADD CONSTRAINT "sys-user-role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "sys-user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-user-role" ADD CONSTRAINT "sys-user-role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "sys-role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-permission" ADD CONSTRAINT "sys-permission_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "sys-resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-resource" ADD CONSTRAINT "sys-resource_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "sys-subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
