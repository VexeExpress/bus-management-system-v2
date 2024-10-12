import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import officeReducer from './officeSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};
const officePersistConfig = {
    key: 'office',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedOfficeReducer = persistReducer(officePersistConfig, officeReducer);



const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        office: persistedOfficeReducer,
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
