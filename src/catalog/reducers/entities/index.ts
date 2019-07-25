import { FSA } from 'flux-standard-action';
import { uniq, keyBy } from 'lodash';

import { IFilterOptions } from '../../models/filters';
import { IPhone, Phone } from '../../models/phone';
import { actions } from '../../actions';

export interface ICatalogEntitiesState {
    phones: { [key: number]: Phone };
    allIds: number[];
    filterOptions: undefined | IFilterOptions;
}

const defaultState: ICatalogEntitiesState = {
    phones: [],
    allIds: [],
    filterOptions: undefined
};

const prepareFilters = (phones: Phone[]): IFilterOptions => {
    const brands: string[] = [];
    const sim: string[] = [];
    const gps: string[] = [];
    const audioJack: string[] = [];

    phones.forEach((datum) => {
        brands.push(datum.brand);
        sim.push(datum.sim);
        gps.push(datum.hardware.gps);
        audioJack.push(datum.hardware.audioJack);
    });

    const uniqueBrands: string[] = uniq(brands);
    const uniqueSim: string[] = uniq(sim);
    const uniqueGps: string[] = uniq(gps);
    const uniqueAudioJack: string[] = uniq(audioJack);

    return {
        brands: uniqueBrands,
        sim: uniqueSim,
        gps: uniqueGps,
        audioJack: uniqueAudioJack
    };
};

export default (state: ICatalogEntitiesState = defaultState, action: FSA<string, Phone[]>): ICatalogEntitiesState => {
    switch (action.type) {
        case actions.LOAD_CATALOG__SUCCESS:
            const phones: Phone[] = action.payload;
            return {
                ...state,
                phones: { ...state.phones, ...keyBy(phones, 'id') },
                filterOptions: prepareFilters(phones)
            };
        default:
            return state;
    }
};
