import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromConfiguration from '../../reducers/configuration.reducer';
import * as fromDistrictForm from '../../reducers/district-form.reducer';
import * as fromDistrict from '../../reducers/district.reducer';
import * as districts from '../../actions/district.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroupState } from 'ngrx-forms';
import { DistrictSocketService } from '../../sockets/district.socket';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'kaf-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit, OnDestroy {
  districtForm$: Observable<FormGroupState<fromDistrictForm.DistrictFormState>>;
  districtRead$: Subscription;
  districts$: Observable<any>;

  constructor(
    private store: Store<fromConfiguration.ConfigurationState>,
    private districtSocket: DistrictSocketService
  ) {
    this.districtForm$ = this.store.pipe(select(fromConfiguration.getDistrictFormState));
    this.districts$ = this.store.pipe(select(fromConfiguration.selectAllDistricts));
    this.districtRead$ = this.districtSocket.DistrictReturn().subscribe(val => {
      this.store.dispatch(new districts.LoadDistrictsSuccess(val));
    });
    this.districtSocket.DistrictRead();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.districtRead$.unsubscribe();
  }

}
