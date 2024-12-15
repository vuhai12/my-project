// utils/auth.ts
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export const clearAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};
