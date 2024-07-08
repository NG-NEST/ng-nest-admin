import { Injectable, inject, signal } from '@angular/core';
import { XStorageService } from '@ng-nest/ui/core';
import { XI18nLanguage, XI18nProperty, XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppLocaleService {
  storage = inject(XStorageService);
  i18n = inject(XI18nService);
  platform = inject(Platform);
  http = inject(HttpClient);
  defaultLang = signal<XI18nLanguage>(this.i18n.getLocaleId());
  langs = signal(['zh_CN', 'en_US']);
  cacheLangs = signal<{ [lang: string]: XI18nProperty }>({});
  get lang(): XI18nLanguage {
    let lg = this.storage.getLocal('Lang');
    if (!lg) {
      this.storage.setLocal('Lang', this.defaultLang());
      return this.defaultLang()!;
    }
    return lg;
  }

  set lang(value: string) {
    this.storage.setLocal('Lang', value);
  }

  init() {
    return this.setLocale(this.defaultLang());
  }

  private setLocale(lang?: XI18nLanguage) {
    if (!lang) lang = this.lang;
    if (this.cacheLangs()[lang]) {
      this.lang = lang as string;
      this.i18n.setLocale(this.cacheLangs()[lang], true);
      return of(true);
    } else {
      let url = `/assets/i18n/${lang}.json`;
      return this.http.get<XI18nProperty>(url).pipe(
        map((x) => {
          this.lang = lang as string;
          const localeProps = this.setLocaleProps(x, this.lang);
          this.i18n.setLocale(localeProps, true);
          this.cacheLangs()[this.lang] = localeProps;
          return true;
        })
      );
    }
  }

  private setLocaleProps(locale: XI18nProperty, lang: string): XI18nProperty {
    if (lang === 'zh_CN') {
      return { ...zh_CN, ...locale };
    } else if (lang === 'en_US') {
      return { ...en_US, ...locale };
    } else {
      return locale;
    }
  }
}
