import { FSA } from 'flux-standard-action';
import { map } from 'lodash';

import { actions } from '../../actions';
import { ISelectedFilters } from '../../models/filters';
import { Phone } from '../../models/phone';

export interface ICatalogUIState {
    filteredIds: number[];
    selectedFilters: undefined | ISelectedFilters;
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
}

const defaultState: ICatalogUIState = {
    filteredIds: [],
    selectedFilters: undefined,
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
        case actions.FILTER_CATALOG:
            const filteredIds: number[] = map(action.payload as Phone[], (datum) => {
                return datum.id;
            });

            return {
                ...state,
                selectedFilters: action.payload,
                filteredIds: filteredIds
            };
        default:
            return state;
    }
};
