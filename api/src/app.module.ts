import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./system/users/users.module";
import { DemoModule } from "./system/demo/demo.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, DemoModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
