import http from './httpService';

const apiEndpoint = '/lists';

const listUrl = (listId) => `${apiEndpoint}/${listId}`;

export const getLists = () => http.get(`${apiEndpoint}`);

export const getList = (listId) => http.get(listUrl(listId));

export const createList = (list) => http.post(apiEndpoint, list);

export const editList = (listId, list) =>
  http.patch(listUrl(listId), list);

export const deleteList = (listId) => http.delete(listUrl(listId));
