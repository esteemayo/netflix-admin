import http from './httpService';

const apiEndpoint = '/users';

const userUrl = (userId) => `${apiEndpoint}/${userId}`;

export const getAllUsers = () => http.get(apiEndpoint);

export const getUsers = (token) =>
  http.get(`${apiEndpoint}?new=true`, { cancelToken: token });

export const getUsersStats = (token) =>
  http.get(`${apiEndpoint}/stats`, { cancelToken: token });

export const getUser = (userId) => http.get(userUrl(userId));

export const register = (credentials) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const editUser = (userId, credentials) =>
  http.patch(userUrl(userId), credentials);

export const deleteUser = (userId) => http.delete(userUrl(userId));
