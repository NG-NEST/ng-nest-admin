import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { User, AuthService } from "../../services/auth.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  // 登录的loding
  loading: boolean = false;

  // 用户对象
  user: User = new User();

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.user.account = "admin";
    this.user.password = "123qwe";
  }

  // 登录
  login() {
    if (this.loading == false) {
      this.loading = true;
      if (this.user.account && this.user.password) {
        this.authService.login(this.user).subscribe(
          () => {
            if (this.authService.isLoggedIn) {
              let redirect = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : `/${environment.layout}`;
              this.router.navigate([redirect]);
            }
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
        // this.toastService.create("用户名或密码不能为空！");
      }
    }
  }
}
