import { Module } from '@nestjs/common';
import { ModelResolver } from './model.resolver';
import { ModelController } from './model.controller';
import { ModelService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ModelController],
  providers: [ModelResolver, ModelService],
})
export class ModelModule {}
