import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XColorsTheme, XComputedStyle, XIsNumber, XVarsTheme } from '@ng-nest/ui/core';
// import { XToCssRem } from '@ng-nest/ui/core';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { AppThemeService } from '@ui/core';

export function XToCssRem(css: string, fontSize: number) {
  if (css === '0') return 0;
  if (XIsNumber(css)) return Number(css);
  else if (css.endsWith('rem')) return Number(css.replace(/rem/g, ''));
  else if (css.endsWith('px')) return Number(css.replace(/px/g, '')) / fontSize;
  return 0;
}

@Component({
  selector: 'app-theme',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XDialogModule,
    XColorPickerComponent,
    XButtonComponent,
    XI18nPipe,
    XRadioComponent,
    XSwitchComponent,
    XIconComponent
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  formBuilder = inject(FormBuilder);
  theme = inject(AppThemeService);
  document = inject(DOCUMENT);
  fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  dark = signal(false);
  setDarking = signal(false);
  formGroup = this.formBuilder.group({
    colors: this.formBuilder.group({
      primary: '',
      success: '',
      warning: '',
      danger: '',
      info: '',
      background: '',
      border: '',
      text: ''
    }),
    vars: this.formBuilder.group({
      fontSize: 0,
      borderWidth: 0,
      borderRadius: 0,
      borderSmallRadius: 0
    })
  });

  ngOnInit() {
    let colors = this.theme.colors();
    let vars = this.theme.vars();
    let dark = this.theme.dark();

    this.dark.set(dark);

    const formVars = { ...this.formGroup.controls.vars.value! };
    for (let key in vars) {
      if (key in formVars) {
        (formVars as any)[key] = XToCssRem(vars[key], this.fontSize());
      }
    }
    this.formGroup.patchValue({ colors, vars: formVars });

    this.formGroup.controls.colors.valueChanges.subscribe((x) => {
      !this.setDarking() && this.theme.setColors(x as XColorsTheme);
    });

    this.formGroup.controls.vars.valueChanges.subscribe((x) => {
      this.theme.setVars(this.addRem(x as XVarsTheme));
    });
  }

  addRem(vars: XVarsTheme) {
    for (let va in vars) {
      if (XIsNumber(vars[va])) {
        vars[va] = `${vars[va]}rem`;
      }
    }
    return vars;
  }

  darkChanged(dark: boolean) {
    this.setDarking.set(true);
    let colors = this.theme.setDark(dark);
    this.formGroup.controls.colors.patchValue(colors);
    this.setDarking.set(false);
  }
}
