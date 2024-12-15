import {
  addPostItem,
  deletePostItem,
  editPostItem,
  getPostList,
} from "../../api/post.api";
import { PostItem } from "../../types/post.type";
import { DispatchApp } from "../store";
import {
  GET_POST_LIST_PENDING,
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_ERROR,
  ADD_POST_ITEM_PENDING,
  ADD_POST_ITEM_SUCCESS,
  ADD_POST_ITEM_ERROR,
  EDIT_POST_ITEM_PENDING,
  EDIT_POST_ITEM_SUCCESS,
  EDIT_POST_ITEM_ERROR,
  DELETE_POST_ITEM_PENDING,
  DELETE_POST_ITEM_SUCCESS,
  DELETE_POST_ITEM_ERROR,
} from "../actionTypes";

export const getPostListAction = () => {
  return async (dispatch: DispatchApp) => {
    dispatch({
      type: GET_POST_LIST_PENDING,
    });
    try {
      const res = await getPostList();
      dispatch({
        type: GET_POST_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_POST_LIST_ERROR,
      });
    }
  };
};

export const addPostItemAction = (body: Omit<PostItem, "id">) => {
  return async (dispatch: DispatchApp) => {
    dispatch({
      type: ADD_POST_ITEM_PENDING,
    });
    try {
      const res = await addPostItem(body); // Không ném lỗi với status < 500
      if (res.status === 422) {
        console.warn("Validation error:", res.data);
        dispatch({
          type: ADD_POST_ITEM_ERROR,
          payload: res.data, // Lưu lỗi từ server
        });
      } else {
        dispatch({
          type: ADD_POST_ITEM_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.warn("Unexpected error:", error); // Log nhẹ nhàng
      dispatch({
        type: ADD_POST_ITEM_ERROR,
      });
    }
  };
};

export const editPostItemAction = (id: string, body: Omit<PostItem, "id">) => {
  return async (dispatch: DispatchApp) => {
    dispatch({
      type: EDIT_POST_ITEM_PENDING,
    });
    try {
      const res = await editPostItem(id, body);
      dispatch({
        type: EDIT_POST_ITEM_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_POST_ITEM_ERROR,
      });
    }
  };
};

export const deletePostItemAction = (id: string) => {
  return async (dispatch: DispatchApp) => {
    dispatch({
      type: DELETE_POST_ITEM_PENDING,
    });
    try {
      const res = await deletePostItem(id);
      dispatch({
        type: DELETE_POST_ITEM_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_POST_ITEM_ERROR,
      });
    }
  };
};
