import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.model';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public routeList: NavItem[] = [
    {
      label: 'Home',
      routerLink: './'
    },
    {
      label: 'People',
      routerLink: './people'
    },
    {
      label: 'About',
      routerLink: './about'
    },
    {
      label: 'Auth',
      routerLink: './auth'
    },
    {
      label: 'Config',
      routerLink: 'config'
    },
  ];

}
