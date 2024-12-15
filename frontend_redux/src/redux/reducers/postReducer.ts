import { AxiosResponse } from "axios";

const initState = {
  listPosts: [],
  isLoading: false,
  error: null,
};

const postReducer = (
  state = initState,
  action: { type: string; payload: AxiosResponse["data"] }
) => {
  switch (action.type) {
    case "GET_POST_LIST_SUCCESS":
      return { ...state, listPosts: action.payload, isLoading: false };
    case "GET_POST_LIST_PENDING":
      return { ...state, isLoading: true };
    case "GET_POST_LIST_ERROR":
      return { ...state, isLoading: false };
    case "ADD_POST_ITEM_SUCCESS":
      return { ...state, listPosts: action.payload, isLoading: false };
    case "ADD_POST_ITEM_PENDING":
      return { ...state, isLoading: true };
    case "ADD_POST_ITEM_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "EDIT_POST_ITEM_PENDING":
      return { ...state, listPosts: action.payload, isLoading: false };
    case "EDIT_POST_ITEM_SUCCESS":
      return { ...state, isLoading: true };
    case "EDIT_POST_ITEM_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
