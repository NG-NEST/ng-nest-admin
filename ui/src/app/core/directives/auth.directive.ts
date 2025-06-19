import { Directive, ElementRef, Renderer2, inject, input } from '@angular/core';
import { AppAuthService } from '../services/auth.service';

@Directive({
  selector: '[app-auth]'
})
export class AppAuthDirective {
  ele = inject(ElementRef);
  authService = inject(AppAuthService);
  renderer = inject(Renderer2);

  auth = input.required<string>({ alias: 'app-auth' });

  and = input<boolean | null>(null);

  or = input<boolean | null>(null);

  hidden = input(true);

  isGrant: boolean = false;

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
