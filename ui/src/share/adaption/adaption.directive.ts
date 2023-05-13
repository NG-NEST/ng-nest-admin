import { Directive, ElementRef, OnDestroy, Input, AfterViewInit, Inject, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { XResize, XResizeObserver } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[au-adaption]'
})
export class AuAdaptionDirective implements AfterViewInit, OnDestroy {
  @Input() outerHeight: number = 0;
  @Input() container!: HTMLElement;

  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) public doc: any) {}

  ngAfterViewInit() {
    this.setSubject();
  }
  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  setSubject() {
    XResize(this.container, this.doc.documentElement)
      .pipe(takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        this.setAdaptionHeight();
      });
  }

  setAdaptionHeight() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.doc.documentElement.clientHeight - this.outerHeight}px`);
  }
}
