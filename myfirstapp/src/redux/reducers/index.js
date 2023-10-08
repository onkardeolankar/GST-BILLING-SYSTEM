import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import poReducer from "./poReducer";

export const reducers=combineReducers({
    userReducer,authReducer,poReducer,
    
});
let rootReducer=null;
export default rootReducer=(state,action)=>{
    let tmp=state;
    return reducers(tmp,action);
}