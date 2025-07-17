import { NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { XTabsModule } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerModule, XDrawerRef } from '@ng-nest/ui/drawer';
import { AppParseJsDoc, FunctionDoc } from '@ui/core';
import { XHighlightComponent } from "@ng-nest/ui/highlight";

@Component({
  selector: 'app-syntax-info',
  imports: [NgTemplateOutlet, XButtonComponent, XDrawerModule, XTabsModule, XHighlightComponent],
  templateUrl: 'syntax-info.component.html',
  styleUrl: 'syntax-info.component.scss'
})
export class SyntaxInfoComponent {
  drawerRef = inject(XDrawerRef<SyntaxInfoComponent>);
  httpClient = inject(HttpClient);
  domSanitizer = inject(DomSanitizer);
  markdownContent: string = '';
  htmlContent: SafeHtml | null = null;
  strings = signal<FunctionDoc[]>([]);
  jsonSchema = signal<FunctionDoc[]>([]);

  ngOnInit() {
    this.httpClient.get('/assets/mark/strings.d.ts', { responseType: 'text' }).subscribe((x) => {
      this.strings.set(AppParseJsDoc(x));

      console.log(this.strings());
    });
    this.httpClient
      .get('/assets/mark/json-schema.d.ts', { responseType: 'text' })
      .subscribe((x) => {
        this.jsonSchema.set(AppParseJsDoc(x));

        console.log(this.jsonSchema());
      });
  }

  close() {
    this.drawerRef.close();
  }
}
