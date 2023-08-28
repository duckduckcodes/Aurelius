import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';
import goalSlice from './features/goalSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist'; // Import persistStore
import modalSlice from './features/modalSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  goal: goalSlice,
  modal: modalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Use persistedReducer as the root reducer

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer as the root reducer
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store); // Create the persistor

export {store, persistor};
