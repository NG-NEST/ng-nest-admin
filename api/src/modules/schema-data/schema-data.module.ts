import { Module } from '@nestjs/common';
import { SchemaDataResolver } from './schema-data.resolver';
import { SchemaDataController } from './schema-data.controller';
import { SchemaDataService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SchemaDataController],
  providers: [SchemaDataResolver, SchemaDataService],
})
export class SchemaDataModule {}
