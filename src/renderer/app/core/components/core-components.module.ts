import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const COMPONENTS = [
  NavItemComponent,
  ToolbarComponent
] ;


@NgModule({
  imports: [
    RouterModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [],
})
export class CoreComponentsModule { }
