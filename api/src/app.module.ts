import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { DesignModule } from './design/design.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, SystemModule, DesignModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
