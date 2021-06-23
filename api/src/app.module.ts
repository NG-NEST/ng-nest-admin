import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { ModuleDesignModule } from './module-design/module-design.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, SystemModule, ModuleDesignModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
