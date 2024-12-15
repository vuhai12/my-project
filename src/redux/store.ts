// import { createStore, applyMiddleware } from "redux";
// import  thunk  from "redux-thunk";
// import rootReducer from "./reducers/rootReducer";

// const store = createStore(rootReducer, applyMiddleware(thunk));
// type Store = typeof store;
// export type DispatchApp = Store["dispatch"];

// // export type RootState = Store["getState"];

// // type DispatchApp = ReturnType<typeof store.dispatch>;
// export type RootState = ReturnType<typeof store.getState>;

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer, // Kết hợp reducer của bạn
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;

export default store;
