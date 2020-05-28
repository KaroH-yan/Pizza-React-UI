import { createStore } from "redux";
import rootReducer from "./reduser";
const store = createStore(rootReducer);

export default store;