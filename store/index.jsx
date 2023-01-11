import { combineReducers } from "redux";
import addresses from "./reducers/addresses";

const addressesStore = combineReducers({addresses});

export default addressesStore;