import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { XConfigService, X_THEME_DARK_COLORS, X_THEME_COLORS } from '@ng-nest/ui/core';
import { SettingService } from './setting.service';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _dark = Boolean(this.settingService.getLocal('Dark')) || false;
  public get dark() {
    return this._dark;
  }
  public set dark(value) {
    this._dark = value;
    this.setTheme();
    this.setBodyClass();
    this.settingService.setLocal('Dark', value);
    this.darkChange.next(value);
  }
  darkChange = new BehaviorSubject<boolean>(this.dark);
  renderer: Renderer2;
  constructor(
    public renderFac: RendererFactory2,
    public configService: XConfigService,
    public settingService: SettingService,
    @Inject(DOCUMENT) public doc: Document
  ) {
    this.renderer = this.renderFac.createRenderer(null, null);
  }
  init() {
    this.dark = this._dark;
    this.setBodyClass();
  }

  setTheme() {
    if (this.dark) {
      this.configService.setDarkTheme({ colors: X_THEME_DARK_COLORS });
    } else {
      this.configService.setLightTheme({ colors: X_THEME_COLORS });
    }
  }

  setBodyClass() {
    if (this.dark) {
      this.renderer.removeClass(this.doc.documentElement, 'x-light');
      this.renderer.addClass(this.doc.documentElement, 'x-dark');
    } else {
      this.renderer.removeClass(this.doc.documentElement, 'x-dark');
      this.renderer.addClass(this.doc.documentElement, 'x-light');
    }
  }
}
