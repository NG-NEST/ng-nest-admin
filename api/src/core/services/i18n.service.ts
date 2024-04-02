import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService as NestI18nService } from 'nestjs-i18n';
import { IncomingHttpHeaders } from 'http';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class I18nService {
  constructor(
    private readonly i18n: NestI18nService,
    private readonly config: ConfigService,
  ) {}

  t(key: string, headers?: IncomingHttpHeaders) {
    const lang = this.getCurrentLang(headers);
    return this.i18n.translate(key, { lang });
  }

  private getCurrentLang(headers?: IncomingHttpHeaders): string {
    if (headers) {
      if (headers['x-lang']) {
        return headers['x-lang'] as string;
      }
      if (headers['accept-language']) {
        const lang = headers['accept-language'];

        // zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
        if (lang && lang.indexOf(',') >= 0) {
          const regex = /([a-z]{2,8}(-[a-z]{2,8})?)(?:;q=(\d+(\.\d+)?))?/gi;
          const languagesWithWeights = [];
          let match;
          while ((match = regex.exec(lang)) !== null) {
            const language = match[0];
            const weight = match[2] ? parseFloat(match[2]) : 1.0;
            const languageWithoutWeight = language.split(';')[0];
            languagesWithWeights.push({
              language: languageWithoutWeight,
              weight: weight,
            });
          }
          return languagesWithWeights[0].language;
        } else {
          return lang;
        }
      }
    }
    const current = I18nContext.current();
    if (current) return current.lang;
    const lang = this.config.getOrThrow<string>('LANGUAGE');
    return lang;
  }
}
