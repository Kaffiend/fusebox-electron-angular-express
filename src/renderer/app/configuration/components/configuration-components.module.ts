import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { SortableModule } from 'ngx-bootstrap';
import { DistrictFormComponent } from './district-form/district-form.component';

const COMPONENTS = [
  DistrictFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgrxFormsModule,
    SortableModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ConfigurationComponentsModule { }
