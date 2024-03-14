import { Module } from '@nestjs/common';
import { SchemaResolver } from './schema.resolver';
import { SchemaController } from './schema.controller';
import { SchemaService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SchemaController],
  providers: [SchemaResolver, SchemaService],
})
export class SchemaModule {}
