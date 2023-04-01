import { configureStore } from "@reduxjs/toolkit";
import appApi from "./services/appApi";
import userSlice from "./features/userSlice";

// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// reducer
const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath]
};

// persist our store 

const persistedReducer = persistReducer(persistConfig,reducer);

// create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware:[thunk,appApi.middleware],

});

export default store;