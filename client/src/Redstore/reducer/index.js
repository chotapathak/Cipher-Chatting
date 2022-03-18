import { combineReducers } from "redux";
import { ProcessReducer } from './process';

// importing process-reducer which reduce the process by switching state and action
const rootReducer = combineReducers({
    ProcessReducer: ProcessReducer,
});

export default rootReducer;