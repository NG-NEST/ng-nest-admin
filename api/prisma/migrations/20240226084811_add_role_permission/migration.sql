-- CreateTable
CREATE TABLE "sys-role-permission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys-role-permission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- AddForeignKey
ALTER TABLE "sys-role-permission" ADD CONSTRAINT "sys-role-permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "sys-role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys-role-permission" ADD CONSTRAINT "sys-role-permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "sys-permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
