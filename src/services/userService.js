import http from './httpService';

const apiEndpoint = 'users';

const userUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export function getAllUsers() {
  return http.get(apiEndpoint);
}

export function getUsers() {
  return http.get(`${apiEndpoint}?new=true`);
}

export function getUsersStats() {
  return http.get(`${apiEndpoint}/stats`);
}

export function register(credentials) {
  return http.post(`${apiEndpoint}/register`, credentials);
}

export function editUser(id, credentials) {
  return http.patch(userUrl(id), credentials);
}

export function deleteUser(id) {
  return http.delete(userUrl(id));
}
