import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appAdjustWidth]'
})
export class AdjustWidthDirective implements OnInit {
  minWidth = input<number>();
  maxWidth = input<number>();
  defaultValue = input<string>();
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  element = inject(ElementRef<HTMLInputElement>);

  ngOnInit(): void {
    this.setInputWidth(this.defaultValue()!);
    fromEvent(this.element.nativeElement, 'input').subscribe((x: any) => {
      this.setInputWidth(x.target.value);
    });
  }

  setInputWidth(value: string) {
    let width = this.getTextWidth(value);
    if (!value || (this.minWidth() && width < this.minWidth()!)) {
      this.renderer.setStyle(this.element.nativeElement, 'width', `${this.minWidth()}px`);
      return;
    } else {
      if (this.maxWidth() && width + 10 > this.maxWidth()!) {
        width = this.maxWidth();
      }
      this.renderer.setStyle(this.element.nativeElement, 'width', `${width + 10}px`);
    }
  }

  getTextWidth(value: string) {
    const span = this.renderer.createElement('span');
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'pre';
    span.style.display = 'inline-block';
    span.textContent = value;
    this.renderer.appendChild(this.document.body, span);
    const width = span.offsetWidth;
    this.renderer.removeChild(this.document.body, span);
    return width;
  }
}
