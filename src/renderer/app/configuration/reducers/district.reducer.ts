import { Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { District } from '../models/district';
import { DistrictActionTypes } from '../actions/district.actions';

export interface State extends EntityState<District> {
  selectedDistrictId: string | null;
}

export function sortByName(a: District, b: District) {
  return a.description.localeCompare(b.description);
}

export const districtAdapter: EntityAdapter<District> = createEntityAdapter<District>({
  selectId: (district: District) => district._id,
  sortComparer: sortByName
});

export const initialState: State = districtAdapter.getInitialState({
  selectedDistrictId: null
});

export function reducer(state = initialState, action: any): State {
  switch (action.type) {

    case DistrictActionTypes.LoadDistrictsSuccess: {
      return districtAdapter.addAll(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

export const getSelectedDistrictId = (state: State) => state.selectedDistrictId;

export const {
  selectIds: selectDistrictIds,
  selectEntities: selectDistrictEntities,
  selectAll: selectAllDistricts,
  selectTotal: selectDistrictTotal
} = districtAdapter.getSelectors();
