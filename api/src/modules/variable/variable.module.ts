import { Module } from '@nestjs/common';
import { VariableResolver } from './variable.resolver';
import { VariableController } from './variable.controller';
import { VariableService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VariableController],
  providers: [VariableResolver, VariableService],
})
export class VariableModule {}
