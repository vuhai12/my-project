import { AxiosResponse } from "axios";

const initState = {
  isLoading: false,
  error: null,
};

const authReducer = (
  state = initState,
  action: { type: string; payload: AxiosResponse["data"] }
) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      console.log("action", action.payload);
      return { ...state };

    case "LOGIN_ERROR":
      return { ...state, isLoading: false };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
