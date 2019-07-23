import { applyMiddleware, createStore, Middleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { FSA } from 'flux-standard-action';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';

export interface IAppState {
    version: string;
}

const defaultState: IAppState = {
    version: '0.1.0'
};

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares: Middleware[] = [sagaMiddleware, logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, composedEnhancers);

    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
        (module as any).hot.accept('./reducers', () =>
            store.replaceReducer(rootReducer)
        );
    }

    return store;
}

function rootReducer(state: IAppState = defaultState, action: FSA): IAppState {
    switch (action.type) {
        default:
            return state;
    }
}

const store = configureStore();

export default store;
