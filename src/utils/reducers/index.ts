import { combineReducers } from "@reduxjs/toolkit";
import { favItemsReducer } from "./favItemsReducer";



export default combineReducers({
    favItemsState: favItemsReducer
})