import { createAction } from 'redux-actions';

import { Phone } from '../models/phone';

export const actions = {
    LOAD_CATALOG: 'LOAD_CATALOG',
    LOAD_CATALOG__START: 'LOAD_CATALOG__START',
    LOAD_CATALOG__SUCCESS: 'LOAD_CATALOG__SUCCESS',
    LOAD_CATALOG__ERROR: 'LOAD_CATALOG__ERROR'
};

export const loadCatalog = createAction(
    actions.LOAD_CATALOG,
    (offset: number, limit: number) => {
        return {
            offset,
            limit
        };
    }
);

export const loadCatalogStart = createAction(
    actions.LOAD_CATALOG__START,
    (offset: number, limit: number) => {
        return {
            offset,
            limit
        };
    }
);

export const loadCatalogSuccess = createAction(
    actions.LOAD_CATALOG__SUCCESS,
    (phones: Phone[]) => {
        return phones;
    },
    (phones, offset: number, limit: number) => {
        return {
            offset,
            limit
        };
    }
);

export const loadCatalogError = createAction(
    actions.LOAD_CATALOG__ERROR,
    (error: Error) => {
        return error;
    },
    (error, offset: number, limit: number) => {
        return {
            offset,
            limit
        };
    }
);
