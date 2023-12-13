"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "../reducers/store";

export default function StoreProvider({ children }) {
  const { store, persistor } = makeStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}