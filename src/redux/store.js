import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { CollapsedReducer } from './reducers/CollapsedReducer'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'config',
    storage,
    blackList:[],
    whiteList:[]
}

const reducer = combineReducers({
    CollapsedReducer
})

const PersistReducer = persistReducer(persistConfig,reducer)

const store = createStore(PersistReducer,applyMiddleware(thunk))
const persistor = persistStore(store)

export  {
    store,
    persistor
}