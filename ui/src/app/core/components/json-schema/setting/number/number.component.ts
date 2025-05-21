import { Component, OnInit, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { XJsonSchemaBehaviors, XJsonSchemaIntegerFormats, XTreeData } from '../../json-schema.type';
import { AppSettingComponent } from '../setting.component';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XInputComponent } from '@ng-nest/ui/input';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'app-number',
  imports: [
    ReactiveFormsModule,
    XSelectComponent,
    XSwitchComponent,
    XInputComponent,
    XInputNumberComponent,
    XCheckboxComponent,
    XTooltipDirective,
    XIconComponent
  ],
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    isEnum: false,
    isConst: false,
    const: null,
    enums: this.fb.array([this.fb.group({ value: '', description: '' })]),
    format: null,
    behavior: 0,
    minimum: null,
    maximum: null,
    default: null,
    multipleOf: null,
    examples: null,
    exclusiveMinimum: false,
    exclusiveMaximum: false
  });
  node = input.required<XTreeData>();
  $destory = new Subject<void>();
  formats = XJsonSchemaIntegerFormats;
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

  get minimum() {
    if (this.form?.get('minimum')) {
      return this.form.get('minimum')!.value;
    }
    return -1;
  }

  get maximum() {
    if (this.form?.get('maximum')) {
      return this.form.get('maximum')!.value;
    }
    return -1;
  }

  ngOnInit(): void {
    const {
      isEnum,
      isConst,
      format,
      behavior,
      minimum,
      maximum,
      multipleOf,
      exclusiveMinimum,
      exclusiveMaximum,
      examples,
      enums
    } = this.node();
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
      minimum: minimum,
      maximum: maximum,
      default: this.node().default,
      multipleOf: multipleOf,
      exclusiveMinimum: !!exclusiveMinimum,
      exclusiveMaximum: !!exclusiveMaximum,
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
      this.form.patchValue({ isConst: false, const: null });
    }
  }

  onIsConstChange(value: boolean) {
    if (value) {
      this.enumFormArray.clear();
      this.enumFormArray.push(this.fb.group({ value: null, description: null }));
      this.form.patchValue({ isEnum: false });
    }
  }

  addEnumRow(index: number) {
    this.enumFormArray.insert(
      index + 1,
      this.fb.group({
        value: '',
        description: ''
      })
    );
  }

  removeEnumRow(index: number) {
    this.enumFormArray.removeAt(index);
  }
}
