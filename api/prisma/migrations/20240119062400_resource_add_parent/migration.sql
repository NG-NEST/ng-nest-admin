-- AddForeignKey
ALTER TABLE "sys-resource" ADD CONSTRAINT "sys-resource_pid_fkey" FOREIGN KEY ("pid") REFERENCES "sys-resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
