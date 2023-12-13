
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage";

/* ---------------------------------------------------------------- */
/*                      Reducers' configuration                     */
/* ---------------------------------------------------------------- */

import user from "../reducers/user"
import date from "../reducers/selectedDate"

const reducers = combineReducers({ user, date });

/* ---------------------------------------------------------------- */
/*                      Persistor configuration                     */
/* ---------------------------------------------------------------- */

const persistConfig = {
	key: "exp",
	storage,
	blacklist: [],
	whitelist: ["user", "date"],
};

const persistedReducers = persistReducer(persistConfig, reducers);


/* ---------------------------------------------------------------- */
/*                        Store configuration                       */
/* ---------------------------------------------------------------- */

export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducers,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};