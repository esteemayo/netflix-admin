import http from './httpService';

const apiEndpoint = 'lists';

const listUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export function getLists() {
  return http.get(`${apiEndpoint}`);
}

export function getList(id) {
  return http.get(listUrl(id));
}

export function createList(list) {
  return http.post(apiEndpoint, list);
}

export function editList(id, list) {
  return http.patch(listUrl(id), list);
}

export function deleteList(id) {
  return http.delete(listUrl(id));
}
