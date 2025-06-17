import { Module } from '@nestjs/common';
import { VariableCategoryResolver } from './variable-category.resolver';
import { VariableCategoryController } from './variable-category.controller';
import { VariableCategoryService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VariableCategoryController],
  providers: [VariableCategoryResolver, VariableCategoryService],
})
export class VariableCategoryModule {}
