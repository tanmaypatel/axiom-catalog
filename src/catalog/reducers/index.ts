import { combineReducers, Reducer } from 'redux';

import entitiesReucer, { ICatalogEntitiesState } from './entities';
import uiReducer, { ICatalogUIState } from './ui';

export interface ICatalogState {
    entities: ICatalogEntitiesState;
    ui: ICatalogUIState;
}

const reducer: Reducer<ICatalogState> = combineReducers({
    entities: entitiesReucer,
    ui: uiReducer
});

export default reducer;
