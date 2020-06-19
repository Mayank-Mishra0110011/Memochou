import { SET_USER, GET_ERRORS } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const signup = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/signup", userData)
    .then(() => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      history.push("/login");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const login = (userData) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setUser = (decoded) => {
  return {
    type: SET_USER,
    payload: decoded,
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setUser({}));
};
