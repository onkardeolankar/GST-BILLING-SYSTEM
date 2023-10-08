import * as Actions from "../actions/actions"
const poReducer=(state={},action)=>{
    switch(action.type){
        case Actions.SELECTED_DATA:
            console.log("returning po state>",action.payload.data);
            return (state={...action.payload.data});

        default:
                return state;
        
    }
};
export default poReducer;