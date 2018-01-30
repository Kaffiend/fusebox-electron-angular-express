import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponentsModule } from './components/auth-components.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'auth', component: LoginPageComponent }
    ]),
    AuthComponentsModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPageComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }
}
