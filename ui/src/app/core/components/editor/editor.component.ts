import {
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  Renderer2,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { XButtonComponent, XOutletDirective, XTemplate } from '@ng-nest/ui';
import { AppThemeService } from '@ui/core';
import type { editor } from 'monaco-editor';
import { fromEvent, Subject, takeUntil } from 'rxjs';

// 不再直接声明 monaco，而是动态加载
// declare const monaco: any;

@Component({
  selector: 'app-editor',
  imports: [XButtonComponent, XOutletDirective],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  host: {
    '[class.fullscreen]': 'fullscreen()'
  },
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

  options = input<editor.IStandaloneEditorConstructionOptions>({});
  disabled = input<boolean>(false);
  label = input<XTemplate>('');
  required = input<boolean>(false);

  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  themeService = inject(AppThemeService);

  editorRef = viewChild.required<ElementRef<HTMLDivElement>>('editorRef');

  language = computed(() => {
    return this.getLanguageFromFilename(this.filename());
  });

  fullscreen = signal(false);
  theme = signal<string>('vs');

  value: any = '';

  private originalDimensions: { width: string; height: string } | null = null;

  private $destroy = new Subject<void>();

  private editor!: editor.IStandaloneCodeEditor;
  private monacoInstance: any;
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.updateEditorLanguage(this.language());
    });
  }

  ngOnInit() {
    // this.themeService.darkChange.subscribe((isDark) => {
    //   if (this.editor && this.monacoInstance) {
    //     this.theme.set(isDark ? 'vs-dark' : 'vs');
    //     this.monacoInstance.editor.setTheme(this.theme());
    //   }
    // });
    this.theme.set(this.themeService.dark() ? 'vs-dark' : 'vs');
  }

  ngAfterViewInit(): void {
    this.loadMonaco().then(() => {
      this.initializeEditor();

      fromEvent<KeyboardEvent>(this.document.documentElement, 'keydown')
        .pipe(takeUntil(this.$destroy))
        .subscribe((event) => {
          if (event.key === 'Escape' && this.fullscreen()) {
            this.toggleFullscreen();
          }
        });

      fromEvent(this.document.defaultView as Window, 'resize')
        .pipe(takeUntil(this.$destroy))
        .subscribe(() => {
          if (this.fullscreen() && this.editor) {
            setTimeout(() => {
              this.editor.layout();
            }, 16);
          }
        });
    });
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
    this.$destroy.next();
    this.$destroy.complete();
  }

  toggleFullscreen() {
    const wasFullscreen = this.fullscreen();
    const isFullscreen = !wasFullscreen;

    this.fullscreen.set(isFullscreen);

    const hostElement = this.editorRef().nativeElement;

    if (isFullscreen && hostElement) {
      this.originalDimensions = {
        width: hostElement.clientWidth + 'px',
        height: hostElement.clientHeight + 'px'
      };
      this.renderer.setStyle(hostElement, 'width', '100%');
      this.renderer.setStyle(hostElement, 'height', 'calc(100% - 2rem - var(--x-border-width))');
    } else if (!isFullscreen && hostElement && this.originalDimensions) {
      this.renderer.setStyle(hostElement, 'width', this.originalDimensions.width);
      this.renderer.setStyle(hostElement, 'height', this.originalDimensions.height);

      setTimeout(() => {
        if (this.editor) {
          this.editor.layout();
        }
      });
    }
    setTimeout(() => {
      if (this.editor) {
        this.editor.layout();
      }
    }, 10);
  }

  private loadMonaco(): Promise<any> {
    return new Promise((resolve) => {
      const requireFunc = (window as any).require;
      if (requireFunc) {
        requireFunc.config({
          paths: {
            vs: 'assets/monaco'
          }
        });

        requireFunc(['vs/editor/editor.main'], () => {
          this.monacoInstance = (window as any).monaco;
          resolve(this.monacoInstance);
        });
      } else {
        this.monacoInstance = (window as any).monaco;
        resolve(this.monacoInstance);
      }
    });
  }

  private updateEditorLanguage(language: string) {
    if (this.editor && this.monacoInstance) {
      const model = this.editor.getModel();
      if (model) {
        this.monacoInstance.editor.setModelLanguage(model, language);
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
    if (!this.monacoInstance) {
      console.error('Monaco editor failed to load');
      return;
    }

    this.editor = this.monacoInstance.editor.create(this.editorRef().nativeElement, {
      value: this.value,
      readOnly: this.disabled(),
      language: this.language(),
      theme: this.theme(),
      automaticLayout: true,
      tabSize: 2,
      suggestOnTriggerCharacters: true,
      ...this.options()
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.value = value;
      this.onChange(value);
    });
  }

  writeValue(value: string) {
    this.value = value;
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
