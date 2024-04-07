import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { XIsArray, XIsString } from '@ng-nest/ui/core';
import Prism from 'prismjs';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppPrismService {
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  init() {
    if (!this.isBrowser || !Prism) return of(true);
    const checkString = (str: string) => {
      const regex = /^(['"`])(.*?)\1$/;
      return regex.test(str);
    };
    const checkInputOutput = (str: string) => {
      const regex = /^(\[[^\]]*\]|\([^)]*\))$/;
      return regex.test(str);
    };
    const checkTokens = (tokens: any[], handle: (token: any) => any) => {
      const result: any[] = [];
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const ts = handle(token);

        if (XIsArray(token.content)) {
          ts.content = checkTokens(token.content, handle);
        }

        result.push(ts);
      }
      return result;
    };
    Prism.hooks.add('after-tokenize', (env: any) => {
      let { tokens, language } = env;
      if (language === 'typescript') {
        env.tokens = checkTokens(tokens, (token: any) => {
          if (XIsString(token)) {
            const tstring = token.trim();
            let name = 'property';
            if (checkString(tstring)) {
              name = 'string';
            }
            return new Prism.Token(name, token);
          } else {
            return token;
          }
        });
      } else if (language === 'html') {
        env.tokens = checkTokens(tokens, (token: any) => {
          if (XIsString(token) && checkInputOutput(token)) {
            const start = token.slice(0, 1);
            const end = token.slice(token.length - 1);
            const newstr = token.slice(1, token.length - 1);
            return new Prism.Token('attr-name', [
              new Prism.Token('attr-equals', start),
              new Prism.Token('attr-name', newstr),
              new Prism.Token('attr-equals', end)
            ]);
          } else {
            return token;
          }
        });
      }
    });

    return of(true);
  }
}
