import http from './httpService';

const apiEndpoint = '/lists';

const listUrl = (id) => `${apiEndpoint}/${id}`;

export const getLists = () => http.get(`${apiEndpoint}`);

export const getList = (id) => http.get(listUrl(id));

export const createList = (list) => http.post(apiEndpoint, list);

export const editList = (id, list) => http.patch(listUrl(id), list);

export const deleteList = (id) => http.delete(listUrl(id));
