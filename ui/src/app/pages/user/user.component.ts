import { Component, OnInit } from '@angular/core';
import { UserService } from '@ui/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.user('22fb3481-5872-4697-8a0a-1e6d30aba46554').subscribe((x) => {
      console.log(x);
    });

    this.userService.users({ skip: 0, take: 10, orderBy: { name: 'desc' }, where: { AND: { account: 'admin' } } }).subscribe((x) => {
      console.log(x);
    });

    this.userService.createUser({ name: 'ÕÔÁù', account: 'zhaoliu', email: 'zhaoliu@zhaoliu.com', password: '123456' }).subscribe((x) => {
      console.log(x);
    });
  }
}
