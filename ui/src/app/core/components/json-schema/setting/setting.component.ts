import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XJsonSchemaType, XJsonSchemaTypes, XTreeData } from '../json-schema.type';
import { Subject, takeUntil } from 'rxjs';
import {
  X_DIALOG_DATA,
  XButtonModule,
  XDialogModule,
  XI18nPipe,
  XSelectComponent,
  XSwitchComponent
} from '@ng-nest/ui';
import { ArrayComponent } from './array/array.component';
import { BooleanComponent } from './boolean/boolean.component';
import { IntegerComponent } from './integer/integer.component';
import { NumberComponent } from './number/number.component';
import { ObjectComponent } from './object/object.component';
import { StringComponent } from './string/string.component';

@Component({
  selector: 'app-setting',
  imports: [
    ReactiveFormsModule,
    XSelectComponent,
    XSwitchComponent,
    XDialogModule,
    XButtonModule,
    XI18nPipe,
    ArrayComponent,
    BooleanComponent,
    IntegerComponent,
    NumberComponent,
    ObjectComponent,
    StringComponent
  ],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class AppSettingComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  typeList = XJsonSchemaTypes;
  $destory = new Subject<void>();
  fb = inject(FormBuilder);
  data = inject<{
    node: XTreeData;
    typeChange: Subject<XJsonSchemaType>;
    nodeChange: Subject<XTreeData>;
  }>(X_DIALOG_DATA);

  node = signal<XTreeData>({});
  typeChange = signal<Subject<XJsonSchemaType>>(new Subject<XJsonSchemaType>());
  nodeChange = signal<Subject<XTreeData>>(new Subject<XTreeData>());

  constructor() {
    this.node.set(this.data.node);
    this.typeChange.set(this.data.typeChange);
    this.nodeChange.set(this.data.nodeChange);
  }

  ngOnInit(): void {
    const { type, name, isArray, required, nullable, deprecated } = this.node();
    this.form = this.fb.group({
      type,
      required: name !== '$root' && !isArray ? !!required : false,
      nullable: !!nullable,
      deprecated: !!deprecated
    });

    if (type === 'null') {
      this.form.controls['nullable'].disable();
    }

    this.form.valueChanges.pipe(takeUntil(this.$destory)).subscribe((value) => {
      const { required, nullable, deprecated } = value;
      const changed: XTreeData = { required, nullable, deprecated };
      this.nodeChange().next(changed);
    });
  }

  ngOnDestroy(): void {
    this.$destory.next();
    this.$destory.complete();
  }

  onTypeChange(value: XJsonSchemaType) {
    this.typeChange().next(value);
  }
}
