import { combineReducers, configureStore } from "@reduxjs/toolkit";

/* ---------------------------------------------------------------- */
/*                      Reducers' configuration                     */
/* ---------------------------------------------------------------- */

import user from "./user";
import coach from "./coach";

const reducers = combineReducers({ user, coach });

/* ---------------------------------------------------------------- */
/*                        Store configuration                       */
/* ---------------------------------------------------------------- */

export const makeStore = () => {
	const store = configureStore({
		reducer: reducers,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	});
	return { store };
};