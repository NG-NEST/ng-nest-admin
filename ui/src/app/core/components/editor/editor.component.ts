import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  forwardRef,
  inject,
  input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppEditorComponent),
      multi: true
    }
  ]
})
export class AppEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  filename = input<string>('.plaintext');
  theme = input<string>('vs');
  options = input<monaco.editor.IStandaloneEditorConstructionOptions>({});

  elementRef = inject(ElementRef);

  language = computed(() => {
    return this.getLanguageFromFilename(this.filename());
  });

  private editor!: monaco.editor.IStandaloneCodeEditor;
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.updateEditorLanguage(this.language());
    });
  }

  ngOnInit() {
    // console.log('MonacoEnvironment:', (window as any).MonacoEnvironment);
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private updateEditorLanguage(language: string) {
    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }

  private getLanguageFromFilename(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();

    const languageMap: { [key: string]: string } = {
      html: 'html',
      htm: 'html',
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      css: 'css',
      scss: 'scss',
      less: 'less',
      json: 'json',
      xml: 'xml',
      java: 'java',
      py: 'python',
      md: 'markdown',
      sql: 'sql',
      php: 'php',
      rb: 'ruby',
      cpp: 'cpp',
      cs: 'csharp',
      go: 'go',
      sh: 'shell',
      vue: 'vue'
    };

    return extension ? languageMap[extension] || 'plaintext' : 'plaintext';
  }

  private initializeEditor(): void {
    this.editor = monaco.editor.create(this.elementRef.nativeElement, {
      value: '',
      language: this.language(),
      theme: this.theme(),
      automaticLayout: true,
      ...this.options
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.onChange(value);
    });
  }

  writeValue(value: string) {
    if (this.editor) {
      this.editor.setValue(value || '');
      this.editor.setScrollTop(0);
      this.editor.setScrollLeft(0);
    }
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (this.editor) {
      this.editor.updateOptions({ readOnly: isDisabled });
    }
  }
}
