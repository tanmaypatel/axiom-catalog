import { FSA } from 'flux-standard-action';
import { map } from 'lodash';

import { actions } from '../../actions';
import { ISelectedFilters, IFilterOptions } from '../../models/filters';
import { Phone } from '../../models/phone';

export interface ICatalogUIState {
    filteredIds: number[];
    selectedFilters: ISelectedFilters;
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
}

const defaultState: ICatalogUIState = {
    filteredIds: [],
    selectedFilters: {
        searchTerm: '',
        brands: [],
        sim: [],
        gps: [],
        audioJack: []
    },
    isCatalogLoading: false,
    catalogLoadingError: null
};

export default (state: ICatalogUIState = defaultState, action: FSA<string, any>): ICatalogUIState => {
    switch (action.type) {
        case actions.LOAD_CATALOG__START:
            return {
                ...state,
                isCatalogLoading: true,
                catalogLoadingError: null
            };
        case actions.LOAD_CATALOG__SUCCESS:
            return {
                ...state,
                isCatalogLoading: false,
                filteredIds: map(action.payload as Phone[], (datum) => {
                    return datum.id;
                })
            };
        case actions.LOAD_CATALOG__ERROR:
            return {
                ...state,
                catalogLoadingError: action.payload
            };

        case actions.FILTER_OPTIONS_UPDATE:
            const updatedOptions: IFilterOptions = action.payload as IFilterOptions;
            return {
                ...state,
                selectedFilters: {
                    ...state.selectedFilters,
                    brands: [...state.selectedFilters.brands, ...updatedOptions.brands],
                    sim: [...state.selectedFilters.sim, ...updatedOptions.sim],
                    gps: [...state.selectedFilters.gps, ...updatedOptions.gps],
                    audioJack: [...state.selectedFilters.audioJack, ...updatedOptions.audioJack]
                }
            };

        case actions.FILTER_CATALOG:
            return {
                ...state,
                selectedFilters: action.payload,
                filteredIds: [...state.filteredIds]
            };
        default:
            return state;
    }
};
