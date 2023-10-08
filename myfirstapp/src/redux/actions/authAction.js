import { LOGIN, LOGOUT } from "./actions";

export const loginAction = (data) => (Dispatch) => {
  Dispatch({
    type: LOGIN,
    payload: { data },
  });
};

export const logoutAction = () => (Dispatch) => {
  localStorage.clear();

  Dispatch({
    type: LOGOUT,
  });
};
