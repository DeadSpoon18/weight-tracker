import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import { auth, db } from "../firebase";

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    auth.signInAnonymously();
    auth.onAuthStateChanged((user) => {
      localStorage.setItem("userInfo", JSON.stringify(user));
      db.collection("users").add({ id: user.uid });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
