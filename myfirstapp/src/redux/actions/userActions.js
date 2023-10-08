import { ADD_USER_DATA, SEARCHED_DATA } from "./actions"

export const addUserInfo = (data) => (Dispatch) => {
    Dispatch({
      type: ADD_USER_DATA,
      payload: { data },
    });
  };
  


export const searchData=(data)=>(Dispatch)=>{
        Dispatch({
            type:SEARCHED_DATA,
            payload:{data}
        });

};
