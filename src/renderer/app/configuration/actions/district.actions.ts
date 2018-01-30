import { Action } from '@ngrx/store';
import { District } from '../models/district';

export enum DistrictActionTypes {
  LoadPeople = '[District] Load District',
  LoadDistrictsSuccess = '[District] Load District Success',
  LoadDistrictsFailure = '[District] Load Districts Failure',
  AddDistrict = '[District] Add District',
  UpdateDistrict = '[District] Update District',
  DeleteDistrict = '[District] Delete District',
  ClearDistricts = '[District] Clear Districts'
}

export class LoadDistricts implements Action {
  readonly type = DistrictActionTypes.LoadPeople;
}

export class LoadDistrictsSuccess implements Action {
  readonly type = DistrictActionTypes.LoadDistrictsSuccess;
  constructor(public payload: District[]) {}
}

export class LoadDistrictsFailure implements Action {
  readonly type = DistrictActionTypes.LoadDistrictsFailure;
}

export class AddDistrict implements Action {
  readonly type = DistrictActionTypes.AddDistrict;
  constructor(public payload: { person: District }) {}
}

export class DeleteDistrict implements Action {
  readonly type = DistrictActionTypes.DeleteDistrict;
  constructor(public payload: { id: string }) {}
}

export class ClearDistricts implements Action {
  readonly type = DistrictActionTypes.ClearDistricts;
}

export type DistrictActions = LoadDistricts | LoadDistrictsSuccess | LoadDistrictsFailure | AddDistrict | DeleteDistrict | ClearDistricts;
