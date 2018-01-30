import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import './styles/styles.scss';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
