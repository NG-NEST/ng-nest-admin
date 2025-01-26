import { Directive, ElementRef, Renderer2, input } from '@angular/core';
import { AppAuthService } from '../services/auth.service';

@Directive({
  selector: '[app-auth]'
})
export class AppAuthDirective {
  auth = input.required<string>({ alias: 'app-auth' });

  and = input<boolean | null>(null);

  or = input<boolean | null>(null);

  hidden = input(true);

  isGrant: boolean = false;

  constructor(
    public ele: ElementRef,
    public authService: AppAuthService,
    public renderer: Renderer2
  ) {}

  ngOnInit() {
    if (!this.auth()) return;
    let isAuth: boolean = this.authService.hasPermission(this.auth());
    if (this.and() !== null) {
      this.isGrant = (isAuth && this.and()) as boolean;
    } else if (this.or() !== null) {
      this.isGrant = (isAuth || this.or()) as boolean;
    } else {
      this.isGrant = isAuth! as boolean;
    }
    if (!this.isGrant) {
      if (this.hidden()) {
        this.ele.nativeElement.parentNode.removeChild(this.ele.nativeElement);
      } else {
        this.ele.nativeElement.disabled = true;
        this.renderer.addClass(this.ele.nativeElement, 'disabled');
      }
    }
  }
}
