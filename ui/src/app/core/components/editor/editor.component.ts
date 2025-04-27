import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
  language = input<string>('javascript');
  theme = input<string>('vs-dark');
  options = input<monaco.editor.IStandaloneEditorConstructionOptions>({});

  elementRef = inject(ElementRef);

  private editor!: monaco.editor.IStandaloneCodeEditor;
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {}

  ngOnInit() {
    console.log('MonacoEnvironment:', (window as any).MonacoEnvironment);
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
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
