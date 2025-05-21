import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { XJsonSchemaBehaviors, XTreeData } from '../../json-schema.type';
import { AppSettingComponent } from '../setting.component';
import { XInputNumberComponent, XSelectComponent } from '@ng-nest/ui';

@Component({
  selector: 'app-array',
  imports: [ReactiveFormsModule, XInputNumberComponent, XSelectComponent],
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    behavior: 0,
    minItems: null,
    maxItems: null,
    uniqueItems: false
  });
  node = input.required<XTreeData>();
  $destory = new Subject<void>();
  behaviors = XJsonSchemaBehaviors;
  defaultValues = ['true', 'false'];
  setting = inject(AppSettingComponent, { host: true, optional: true });

  ngOnInit(): void {
    const { behavior, minItems, maxItems, uniqueItems } = this.node();
    this.form.patchValue({
      behavior: behavior ? behavior : 0,
      minItems,
      maxItems,
      uniqueItems: !!uniqueItems
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
