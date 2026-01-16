import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { XJsonSchemaBehaviors, XTreeData } from '../../json-schema.type';
import { AppSettingComponent } from '../setting.component';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XI18nPipe } from '@ng-nest/ui';

@Component({
  selector: 'app-boolean',
  imports: [ReactiveFormsModule, XSelectComponent, XI18nPipe],
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    behavior: 0,
    default: null
  });
  node = input.required<XTreeData>();
  $destory = new Subject<void>();
  behaviors = XJsonSchemaBehaviors;
  defaultValues = [true, false];
  setting = inject(AppSettingComponent, { host: true, optional: true });

  ngOnInit(): void {
    const { behavior } = this.node();
    this.form.patchValue({
      behavior: behavior ? behavior : 0,
      default: this.node().default
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
