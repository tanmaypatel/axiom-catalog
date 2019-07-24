import { FSA } from 'flux-standard-action';

import { IPhone, Phone } from '../../models/phone';
import { actions } from '../../actions';

export interface ICatalogEntitiesState {
    phones: Phone[];
    allIds: number[];
}

const defaultState: ICatalogEntitiesState = {
    phones: [],
    allIds: []
};

export default (state: ICatalogEntitiesState = defaultState, action: FSA<string, Phone[]>): ICatalogEntitiesState => {
    switch (action.type) {
        case actions.LOAD_CATALOG__SUCCESS:
            return {
                ...state,
                phones: [...state.phones, ...action.payload]
            };
        default:
            return state;
    }
};
