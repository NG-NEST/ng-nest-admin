import { Module } from '@nestjs/common';
import { LanguageResolver } from './language.resolver';
import { LanguageController } from './language.controller';
import { AuthModule } from '../auth/auth.module';
import { LanguageService } from '@api/services';

@Module({
  imports: [AuthModule],
  controllers: [LanguageController],
  providers: [LanguageResolver, LanguageService],
})
export class LanguageModule {}
