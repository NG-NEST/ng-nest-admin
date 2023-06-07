import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { DesignModule } from './design/design.module';
import { DemoModule } from './system/demo/demo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '101.42.251.5',
      port: 3306,
      username: 'ng-nest-admin',
      password: '8TZBSd3xrYpBwZzH',
      database: 'ng-nest-admin',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['query', 'error']
    }),
    SystemModule,
    AuthModule,
    DesignModule,
    DemoModule
  ]
})
export class AppModule {}
