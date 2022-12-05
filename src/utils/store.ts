import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

export const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store)
