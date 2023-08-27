import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';
import goalSlice from './features/goalSlice';
import streakSlice from './features/streakSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'; // Import persistStore

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  goal: goalSlice,
  streak: streakSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Use persistedReducer as the root reducer

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer as the root reducer
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store); // Create the persistor

export { store, persistor };
