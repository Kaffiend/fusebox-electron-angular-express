import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxElectronModule } from 'ngx-electron';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app/app.component';
import { HomePageComponent } from './home/containers/home-page';
import { HomeModule } from './home/home.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/utils';
import { reducers, metaReducers } from './reducers/root.reducer';
import { PeopleModule } from './people/people.module';
import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NgxElectronModule,
    CommonModule,
    NgrxFormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument(),
    CoreModule.forRoot(),
    AuthModule,
    ConfigurationModule,
    HomeModule,
    PeopleModule,
    AboutModule,
    RouterModule.forRoot([{path: './', component: HomePageComponent}]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
