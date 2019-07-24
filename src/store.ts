import { applyMiddleware, createStore, Middleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import catalogReducer, { ICatalogState } from './catalog/reducers';
import rootSaga from './sagas';
import catalogSaga from './catalog/sagas';

export interface IAppState {
    catalog: ICatalogState;
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares: Middleware[] = [sagaMiddleware, logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(
        combineReducers({
            catalog: catalogReducer
        }),
        composedEnhancers
    );

    sagaMiddleware.run(rootSaga);
    sagaMiddleware.run(catalogSaga);

    return store;
}

const store = configureStore();

export default store;
