import { FSA } from 'flux-standard-action';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { actions, loadCatalogStart, loadCatalogSuccess, loadCatalogError } from '../actions';

function* loadCatalog(action: FSA<string, any>): IterableIterator<any> {
    try {
        yield put(loadCatalogStart(action.payload.offset, action.payload.limit));
        yield put(loadCatalogSuccess([], action.payload.offset, action.payload.limit));
    } catch (error) {
        yield put(loadCatalogError(error, action.payload.offset, action.payload.limit));
    }
}

function* catalogSaga(): IterableIterator<any> {
    takeLatest(actions.LOAD_CATALOG, loadCatalog);
}

export default catalogSaga;
