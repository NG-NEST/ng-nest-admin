import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { XJsonSchemaBehaviors, XTreeData } from '../../json-schema.type';
import { AppSettingComponent } from '../setting.component';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'app-object',
  imports: [ReactiveFormsModule, XSelectComponent, XSwitchComponent, XInputNumberComponent],
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    behavior: 0,
    minProperties: null,
    maxProperties: null,
    additionalProperties: true
  });
  node = input.required<XTreeData>();
  $destory = new Subject<void>();
  behaviors = XJsonSchemaBehaviors;
  defaultValues = ['true', 'false'];
  setting = inject(AppSettingComponent, { host: true, optional: true });

  ngOnInit(): void {
    const { behavior, minProperties, maxProperties, additionalProperties } = this.node();

    this.form.patchValue({
      behavior: behavior ? behavior : 0,
      minProperties: minProperties,
      maxProperties: maxProperties,
      additionalProperties:
        additionalProperties === null || additionalProperties === undefined
          ? true
          : additionalProperties
    });

    this.form.valueChanges.pipe(takeUntil(this.$destory)).subscribe((x) => {
      this.setting?.nodeChange().next(x);
    });
  }

  ngOnDestroy(): void {
    this.$destory.next();
    this.$destory.complete();
  }
}
