import { ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, HeaderResolver, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';

export const i18nConfig = {
  useFactory: (configService: ConfigService) => ({
    fallbackLanguage: configService.getOrThrow('LANG'),
    loaderOptions: {
      path: join(__dirname, '../../i18n/'),
      watch: true,
    },
    typesOutputPath: join(__dirname, '../../../src/generated/i18n.generated.ts'),
  }),
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
  inject: [ConfigService],
};
