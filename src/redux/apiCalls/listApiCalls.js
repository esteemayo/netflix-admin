import * as actions from '../list';
import * as listService from 'services/listService';

export const fetchLists = async (dispatch) => {
  dispatch(actions.getListsStart());

  try {
    const {
      data: { lists },
    } = await listService.getLists();

    dispatch(actions.getListsSuccess(lists));
  } catch (err) {
    dispatch(actions.getListsFailure());
    console.log(err.response);
  }
};

export const createNewList = async (dispatch, list) => {
  dispatch(actions.createListStart());

  try {
    const { data } = await listService.createList(list);
    dispatch(actions.createListSuccess(data.list));
  } catch (err) {
    dispatch(actions.createListFailure());
    console.log(err.response);
  }
};

export const updateList = async (dispatch, id, newList) => {
  dispatch(actions.updateListStart());

  try {
    const {
      data: { list },
    } = await listService.editList(id, newList);

    dispatch(actions.updateListSuccess({ id, list }));
  } catch (err) {
    dispatch(actions.updateListFailure());
    console.log(err.response);
  }
};

export const removeList = async (dispatch, id) => {
  dispatch(actions.deleteListStart());

  try {
    await listService.deleteList(id);
    dispatch(actions.deleteListSuccess(id));
  } catch (err) {
    dispatch(actions.deleteListFailure());
    console.log(err.response);
  }
};
