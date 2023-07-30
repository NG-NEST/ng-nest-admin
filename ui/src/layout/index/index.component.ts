import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { IndexService } from './index.service';
import { NavService } from './../../services/nav.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  @HostBinding('class.sider-shrink') get siderShrink() {
    return this.indexService.local.siderShrink;
  }

  constructor(private indexService: IndexService, private nav: NavService) {
    this.nav.init();
  }

  ngOnInit() {}
}
