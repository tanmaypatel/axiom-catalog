import { FSA } from 'flux-standard-action';
import { keyBy } from 'lodash';

import { IFilterOptions } from '../../models/filters';
import { Phone } from '../../models/phone';
import { actions } from '../../actions';

export interface ICatalogEntitiesState {
    phones: { [key: number]: Phone };
    allIds: number[];
    filterOptions: IFilterOptions;
}

const defaultState: ICatalogEntitiesState = {
    phones: [],
    allIds: [],
    filterOptions: {
        brands: [],
        sim: [],
        gps: [],
        audioJack: []
    }
};

export default (
    state: ICatalogEntitiesState = defaultState,
    action: FSA<string, Phone[] | IFilterOptions>
): ICatalogEntitiesState => {
    switch (action.type) {
        case actions.LOAD_CATALOG__SUCCESS:
            const phones: Phone[] = action.payload as Phone[];
            return {
                ...state,
                phones: { ...state.phones, ...keyBy(phones, 'id') }
            };
        case actions.FILTER_OPTIONS_UPDATE:
            const updatedOptions: IFilterOptions = action.payload as IFilterOptions;
            return {
                ...state,
                filterOptions: {
                    brands: [...state.filterOptions.brands, ...updatedOptions.brands],
                    sim: [...state.filterOptions.sim, ...updatedOptions.sim],
                    gps: [...state.filterOptions.gps, ...updatedOptions.gps],
                    audioJack: [...state.filterOptions.audioJack, ...updatedOptions.audioJack]
                }
            };
        default:
            return state;
    }
};
