import { FormGroup } from "@angular/forms";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../environments/environment";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  // 登录的loding
  loading: boolean = false;

  userForm: FormGroup = this.formBuilder.group({
    account: ["admin"],
    password: ["123qwe"]
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  // 登录
  login() {
    if (this.loading == false) {
      this.loading = true;
      let user = this.userForm.value;
      if (user.account && user.password) {
        this.authService.login(user).subscribe(
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
