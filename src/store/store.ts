import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { globalReducer } from "./reducers/global";

const reducer = combineReducers({ global: globalReducer.reducer });

export const store = configureStore({ reducer });
