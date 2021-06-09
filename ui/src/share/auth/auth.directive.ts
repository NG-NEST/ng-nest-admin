import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { IndexService } from 'src/layout/index/index.service';

@Directive({
  selector: '[au-auth]'
})
export class AuAuthDirective {
  @Input('au-auth')
  auth!: string;

  @Input()
  and!: boolean;

  @Input()
  or!: boolean;

  @Input()
  hidden: boolean = true;

  isGrant: boolean = false;

  constructor(public ele: ElementRef, public authService: AuthService, public renderer: Renderer2, public index: IndexService) {}

  ngOnInit() {
    if (!this.auth) return;
    let isAuth;
    let menu = this.authService.user.permissions?.menus?.find((x) => x.router == this.index.session.activatedPage);
    if (menu) {
      isAuth = this.authService.user.permissions?.actions?.find((x) => x.menuId == menu?.id && x.code == this.auth);
    }
    if (this.and != null) {
      this.isGrant = (isAuth && this.and) as boolean;
    } else if (this.or != null) {
      this.isGrant = (isAuth || this.or) as boolean;
    } else {
      this.isGrant = isAuth as boolean;
    }
    if (!this.isGrant) {
      if (this.hidden) {
        this.ele.nativeElement.parentNode.removeChild(this.ele.nativeElement);
      } else {
        this.ele.nativeElement.disabled = true;
        this.renderer.addClass(this.ele.nativeElement, 'disabled');
      }
    }
  }
}
