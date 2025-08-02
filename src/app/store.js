// * Redux imports
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import loginSlice from "../Data/Slice/loginSlice";

export const persistKey = "nextenti";
const persistConfig = {
  key: persistKey,
  storage: storageSession,
};

const rootReducer = combineReducers({
  login: loginSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
