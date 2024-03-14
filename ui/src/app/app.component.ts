import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CacheService } from '@ui/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private cacheService: CacheService) {
    this.cacheService.cacheKeys().subscribe((x) => {
      console.log(x);
    });
    this.cacheService
      .cache(
        'RoleSelect:eyJxdWVyeSI6InF1ZXJ5IFJvbGVTZWxlY3QgeyByb2xlU2VsZWN0IHsgZGVzY3JpcHRpb24gaWQgbmFtZSB9fSIsIm9wZXJhdGlvbk5hbWUiOiJSb2xlU2VsZWN0IiwidmFyaWFibGVzIjp7fX0='
      )
      .subscribe((x) => {
        console.log(x);
      });
  }
}
