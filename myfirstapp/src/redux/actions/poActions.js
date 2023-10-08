import { LOGIN, LOGOUT, SELECTED_DATA } from "./actions";

export const selectedPOAction = (data) => (Dispatch) => {
    console.log("Dispatched selected data=",data)
  Dispatch({
    type: SELECTED_DATA,
    payload: { data },
  });
};


