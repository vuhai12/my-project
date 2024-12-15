import { DispatchApp } from "../store";
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from "../actionTypes";
import { LoginType } from "../../types/auth.type";
import { loginApi } from "../../api/auth.api";
import { setAccessToken, setRefreshToken } from "../../utils/auth";

export const postLogin = (data: LoginType) => {
  return async (dispatch: DispatchApp) => {
    dispatch({
      type: LOGIN_PENDING,
    });
    try {
      const res = await loginApi(data);

      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      return res.data;
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
};
