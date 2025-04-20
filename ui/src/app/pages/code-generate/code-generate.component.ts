import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogueService, ResourceService } from '@ui/api';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { delay, finalize, tap } from 'rxjs';
import { XDialogService } from '@ng-nest/ui/dialog';
import { CatalogueComponent } from './catalogue/catalogue.component';

@Component({
  selector: 'app-code-generate',
  imports: [
    ReactiveFormsModule,
    XTreeComponent,
    XTreeSelectComponent,
    XButtonComponent,
    XLoadingComponent
  ],
  templateUrl: './code-generate.component.html',
  styleUrls: ['./code-generate.component.scss'],
  animations: []
})
export class CodeGenerateComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    category: ['']
  });
  categories = signal<XTreeSelectNode[]>([]);
  treeLoading = signal(false);
  treeData = signal<XTreeNode[]>([
    { id: 1, label: '目录一' },
    { id: 2, label: '目录二' },
    { id: 3, label: '目录三' }
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private resource: ResourceService,
    private catalogue: CatalogueService,
    private dialog: XDialogService
  ) {}

  ngOnInit(): void {
    this.getCategories().subscribe();
    this.form.controls.category.valueChanges.subscribe((x) => {
      this.getCatalogues(x!).subscribe();
    });
  }

  ngOnDestroy(): void {}

  action(type: string) {
    switch (type) {
      case 'add-root':
        this.dialog.create(CatalogueComponent, {
          width: '30rem',
          data: {
            resourceId: this.form.value.category,
            type: type,
            saveSuccess: () => {
              console.log(111);
            }
          }
        });
        break;
    }
  }

  getCatalogues(resourceId: string) {
    this.treeLoading.set(true);
    return this.catalogue
      .catalogueSelect({
        where: { resourceId: { equals: resourceId! } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        delay(2000),
        tap((y) =>
          this.treeData.set(
            y.map((z: any) => {
              z.label = z.name;
              return z;
            })
          )
        ),
        finalize(() => this.treeLoading.set(false))
      );
  }

  getCategories() {
    return this.resource
      .resourceSelect({
        where: { subject: { code: { equals: 'code-category' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) =>
          this.categories.set(
            x.map((y: any) => {
              y.label = y.name;
              return y;
            })
          )
        )
      );
  }
}
