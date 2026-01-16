import { Component, OnInit, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { XJsonSchemaBehaviors, XJsonSchemaStringFormats, XTreeData } from '../../json-schema.type';
import { AppSettingComponent } from '../setting.component';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XInputComponent } from '@ng-nest/ui/input';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XI18nPipe } from '@ng-nest/ui';

@Component({
  selector: 'app-string',
  imports: [
    ReactiveFormsModule,
    XSelectComponent,
    XSwitchComponent,
    XInputComponent,
    XInputNumberComponent,
    XTooltipDirective,
    XIconComponent,
    XI18nPipe
  ],
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements OnInit {
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    isEnum: false,
    isConst: false,
    const: null,
    enums: this.fb.array([this.fb.group({ value: null, description: null })]),
    format: null,
    behavior: 0,
    minLength: null,
    maxLength: null,
    default: null,
    pattern: null,
    examples: null
  });
  node = input.required<XTreeData>();
  $destory = new Subject<void>();
  formats = XJsonSchemaStringFormats;
  behaviors = XJsonSchemaBehaviors;
  setting = inject(AppSettingComponent, { host: true, optional: true });
  get enumFormArray() {
    return this.form.get('enums') as FormArray;
  }

  get isConst() {
    if (this.form?.get('isConst')) {
      return this.form.get('isConst')!.value;
    }
    return false;
  }

  get isEnum() {
    if (this.form?.get('isEnum')) {
      return this.form.get('isEnum')!.value;
    }
    return false;
  }

  ngOnInit(): void {
    const { isEnum, isConst, format, behavior, minLength, maxLength, pattern, examples, enums } =
      this.node();

    if (enums && Array.isArray(enums) && enums.length > 0) {
      this.enumFormArray.clear();
      for (let { value, description } of enums) {
        this.enumFormArray.push(this.fb.group({ value, description }));
      }
    }

    this.form.patchValue({
      isEnum: !!isEnum,
      isConst: !!isConst,
      const: this.node().const,
      enums,
      format: format,
      behavior: behavior ? behavior : 0,
      minLength: minLength,
      maxLength: maxLength,
      default: this.node().default,
      pattern: pattern,
      examples: examples
    });

    this.form.valueChanges.pipe(takeUntil(this.$destory)).subscribe((x) => {
      this.setting?.nodeChange().next(x);
    });
  }

  ngOnDestroy(): void {
    this.$destory.next();
    this.$destory.complete();
  }

  onIsEnumChange(value: boolean) {
    if (value) {
      this.form.patchValue({ isConst: false, const: undefined });
    } else {
      this.enumFormArray.clear();
      this.enumFormArray.push(this.fb.group({ value: null, description: null }));
    }
  }

  onIsConstChange(value: boolean) {
    if (value) {
      this.enumFormArray.clear();
      this.enumFormArray.push(this.fb.group({ value: null, description: null }));
      this.form.patchValue({ isEnum: false });
    } else {
      this.form.patchValue({ const: undefined });
    }
  }

  addEnumRow(index: number) {
    this.enumFormArray.insert(
      index + 1,
      this.fb.group({
        value: null,
        description: null
      })
    );
  }

  removeEnumRow(index: number) {
    this.enumFormArray.removeAt(index);
  }
}
