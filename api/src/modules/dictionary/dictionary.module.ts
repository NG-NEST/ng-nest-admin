import { Module } from '@nestjs/common';
import { DictionaryResolver } from './dictionary.resolver';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DictionaryController],
  providers: [DictionaryResolver, DictionaryService],
})
export class DictionaryModule {}
