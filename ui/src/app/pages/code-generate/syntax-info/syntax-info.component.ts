import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerModule, XDrawerRef } from '@ng-nest/ui/drawer';
import { AppParseJsDoc, FunctionDoc } from '@ui/core';

@Component({
  selector: 'app-syntax-info',
  imports: [XButtonComponent, XDrawerModule],
  templateUrl: 'syntax-info.component.html',
  styleUrl: 'syntax-info.component.scss'
})
export class SyntaxInfoComponent {
  drawerRef = inject(XDrawerRef<SyntaxInfoComponent>);
  httpClient = inject(HttpClient);
  domSanitizer = inject(DomSanitizer);
  markdownContent: string = '';
  htmlContent: SafeHtml | null = null;
  functions = signal<FunctionDoc[]>([]);

  ngOnInit() {
    this.httpClient.get('/assets/mark/strings.ts', { responseType: 'text' }).subscribe((x) => {
      this.generateMarkdown(x);
    });
  }

  generateMarkdown(stringsContent: string) {
    this.functions.set(AppParseJsDoc(stringsContent));
  }

  close() {
    this.drawerRef.close();
  }
}
