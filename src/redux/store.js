import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./root-reducer";
import rootSaga from "./saga";

const sagaMiddleWare =createSagaMiddleware();
const middleware=[sagaMiddleWare];

if(process.env.NODE_ENV==="development"){
    middleware.push(logger);
}

const store=createStore(rootReducer,applyMiddleware(...middleware));

sagaMiddleWare.run(rootSaga);

export default store;