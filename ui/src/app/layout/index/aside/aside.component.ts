import { Component, signal } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';
import { AppConfigService } from '@ui/core';
@Component({
    selector: 'app-aside',
    imports: [XMenuComponent],
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  collapsed = signal(false);
  constructor(public config: AppConfigService) {
    // effect(() => {
    //   console.log(`The current count is: ${config.menuActivatedId()}`);
    // });
    // const counterObservable = of(false);
    // // Get a `Signal` representing the `counterObservable`'s value.
    // const counter = toSignal(counterObservable, { initialValue: false });
    // effect(() => {
    //   console.log(`The count is: ${counter()}`);
    // });
    // const mySignal = signal<number>(0);
    // const obs$ = toObservable(mySignal);
    // obs$.subscribe((value) => console.log(value));
    // mySignal.set(1);
    // mySignal.set(2);
    // mySignal.set(3);
    // const aaa = computed(() => {
    //   return mySignal();
    // });
    // setTimeout(() => mySignal.set(100));
    // effect(() => {
    //   console.log(`The aaa is: ${aaa()}`);
    // });
  }
}
