import { inject, Injectable, signal } from '@angular/core';
import { XThemeService, XStorageService, XColorsTheme, XVarsTheme } from '@ng-nest/ui/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppThemeService {
  theme = inject(XThemeService);
  storage = inject(XStorageService);
  colors = signal<XColorsTheme>({});
  vars = signal<XVarsTheme>({});
  dark = signal(false);

  colorsKey = 'XThemeColors';
  varsKey = 'XThemeVars';
  darkKey = 'XThemeDark';

  init() {
    const localColors: XColorsTheme | null = this.storage.getLocal(this.colorsKey) ?? null;
    const localVars: XVarsTheme | null = this.storage.getLocal(this.varsKey) ?? null;
    const localDark: boolean = this.storage.getLocal(this.darkKey) === true;

    const theme = this.theme.getTheme(false);
    const { colors, vars, dark } = theme;

    this.colors.set(localColors ?? colors!);
    this.vars.set(localVars ?? vars!);
    this.dark.set(localDark ?? dark);

    this.setColors(this.colors());
    this.setVars(this.vars());
    this.setDark(this.dark());

    return of(true);
  }

  setColors(colors: XColorsTheme) {
    this.colors.set(colors);
    this.storage.setLocal(this.colorsKey, colors);
    this.theme.setColors(colors);
  }

  setVars(vars: XVarsTheme) {
    this.vars.set(vars);
    this.storage.setLocal(this.varsKey, vars);
    this.theme.setVars(vars);
  }

  setDark(dark: boolean) {
    this.dark.set(dark);
    this.storage.setLocal(this.darkKey, dark);
    return this.theme.setDark(dark);
  }
}
