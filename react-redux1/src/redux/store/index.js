import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import { combineReducers } from "redux";
import appReducer from "./../reducers/appReducer"


const store = createStore(combineReducers({
    appReducer,
}),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store