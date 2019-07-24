import { FSA } from 'flux-standard-action';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { actions, loadCatalogStart, loadCatalogSuccess, loadCatalogError } from '../actions';
import { CatalogService } from '../services/catalog.service';
import { Phone } from '../models/phone';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* loadCatalog(action: FSA<string, any>): IterableIterator<any> {
    try {
        yield put(loadCatalogStart(action.payload.offset, action.payload.limit));
        const phones: Phone[] = yield CatalogService.retrieveCatalog(action.payload.offset, action.payload.limit);
        yield put(loadCatalogSuccess(phones, action.payload.offset, action.payload.limit));
    } catch (error) {
        yield put(loadCatalogError(error, action.payload.offset, action.payload.limit));
    }
}

function* catalogSaga(): IterableIterator<any> {
    yield takeLatest(actions.LOAD_CATALOG, loadCatalog);
}

export default catalogSaga;
