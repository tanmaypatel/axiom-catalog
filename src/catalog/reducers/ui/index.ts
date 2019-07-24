import { FSA } from 'flux-standard-action';

import { actions } from '../../actions';

export interface ICatalogUIState {
    filteredIds: number[];
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
}

const defaultState: ICatalogUIState = {
    filteredIds: [],
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
                isCatalogLoading: false
            };
        case actions.LOAD_CATALOG__ERROR:
            return {
                ...state,
                catalogLoadingError: action.payload
            };
        default:
            return state;
    }
};
