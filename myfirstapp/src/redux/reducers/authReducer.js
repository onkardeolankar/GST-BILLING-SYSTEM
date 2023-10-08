import * as Actions from "../actions/actions";

const authData = localStorage.getItem("authData");
const initialState = authData ? JSON.parse(authData) : {};

const authReducer = (state = initialState, action) => {
  console.log(">>>>>>>>>>action", action);

  switch (action.type) {
    case Actions.LOGIN:
      return (state = { ...action.payload.data });
    case Actions.LOGOUT:
      return (state = {});

    default:
      return state;
  }
};

export default authReducer;
