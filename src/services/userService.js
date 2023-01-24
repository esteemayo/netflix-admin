import http from './httpService';

const apiEndpoint = '/users';

const userUrl = (id) => `${apiEndpoint}/${id}`;

export const getAllUsers = () => http.get(apiEndpoint);

export const getUsers = () => http.get(`${apiEndpoint}?new=true`);

export const getUsersStats = () => http.get(`${apiEndpoint}/stats`);

export const register = (credentials) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const editUser = (id, credentials) =>
  http.patch(userUrl(id), credentials);

export const deleteUser = (id) => http.delete(userUrl(id));
