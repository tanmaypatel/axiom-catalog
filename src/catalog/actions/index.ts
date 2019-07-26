import { createAction } from 'redux-actions';

import { Phone } from '../models/phone';
import { ISelectedFilters, IFilterOptions } from '../models/filters';

export const actions = {
    LOAD_CATALOG: 'actions.catalog.LOAD_CATALOG',
    LOAD_CATALOG__START: 'actions.catalog.LOAD_CATALOG__START',
    LOAD_CATALOG__SUCCESS: 'actions.catalog.LOAD_CATALOG__SUCCESS',
    LOAD_CATALOG__ERROR: 'actions.catalog.LOAD_CATALOG__ERROR',
    FILTER_OPTIONS_UPDATE: 'actions.catalog.FILTER_OPTIONS_UPDATE',
    FILTER_CATALOG: 'actions.catalog.FILTER_CATALOG',
    RESET_FILTERS: 'actions.catalog.RESET_FILTERS'
};

export const loadCatalog = createAction(actions.LOAD_CATALOG, (offset: number, limit: number) => {
    return {
        offset,
        limit
    };
});

export const loadCatalogStart = createAction(actions.LOAD_CATALOG__START, (offset: number, limit: number) => {
    return {
        offset,
        limit
    };
});

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

export const filterOptionsUpdate = createAction(actions.FILTER_OPTIONS_UPDATE, (filterOptions: IFilterOptions) => {
    return filterOptions;
});

export const filterCatalog = createAction(
    actions.FILTER_CATALOG,
    (selectedFilters: ISelectedFilters) => {
        return selectedFilters;
    },
    (selectedFilters) => {
        return selectedFilters;
    }
);

export const resetFilters = createAction(actions.RESET_FILTERS, () => {
    return;
});
