import axios from "../axiosConfig";
import { PostItem } from "../types/post.type";

export const getPostList = () => {
  return axios.get<PostItem>("http://localhost:4000/posts");
};

// export const addPostItem = (body: Omit<PostItem, "id">) => {
//   return axios.post<PostItem>("http://localhost:4000/posts", body);
// };

export const addPostItem = async (body: Omit<PostItem, "id">) => {
  const response = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    // Xử lý lỗi nhưng không log đỏ trong console
    console.warn("Error:", response.status, data);
    return Promise.resolve({ status: response.status, data });
  }

  return data;
};

export const editPostItem = (id: string, body: Omit<PostItem, "id">) => {
  return axios.put<PostItem>(`http://localhost:4000/posts/${id}`, body);
};

export const deletePostItem = (id: string) => {
  return axios.delete<PostItem>(`http://localhost:4000/posts/${id}`);
};
