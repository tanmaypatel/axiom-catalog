import { FSA } from 'flux-standard-action';

import { IPhone, Phone } from '../../models/phone';

export interface ICatalogEntitiesState {
    phones: Phone[];
    allIds: number[];
}

const defaultState: ICatalogEntitiesState = {
    phones: [],
    allIds: []
};

export default (state: ICatalogEntitiesState = defaultState, action: FSA) => {
    switch (action.type) {
        default:
            return state;
    }
};
