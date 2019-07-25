import { FSA } from 'flux-standard-action';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { uniq } from 'lodash';

import { actions, loadCatalogStart, loadCatalogSuccess, loadCatalogError, filterOptionsUpdate } from '../actions';
import { CatalogService } from '../services/catalog.service';
import { Phone } from '../models/phone';
import { IFilterOptions } from '../models/filters';

const _prepareFilters = (phones: Phone[]): IFilterOptions => {
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

function* loadCatalog(action: FSA<string, any>): IterableIterator<any> {
    try {
        yield put(loadCatalogStart(action.payload.offset, action.payload.limit));
        const phones: Phone[] = yield CatalogService.retrieveCatalog(action.payload.offset, action.payload.limit);
        const filterOptions: IFilterOptions = _prepareFilters(phones);
        yield put(loadCatalogSuccess(phones, action.payload.offset, action.payload.limit));
        yield put(filterOptionsUpdate(filterOptions));
    } catch (error) {
        yield put(loadCatalogError(error, action.payload.offset, action.payload.limit));
    }
}

function* catalogSaga(): IterableIterator<any> {
    yield takeLatest(actions.LOAD_CATALOG, loadCatalog);
}

export default catalogSaga;
