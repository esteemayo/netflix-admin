import * as actions from '../user';
import { login } from 'services/authService';
import * as userService from 'services/userService';

const tokenKey = 'accessToken';

export const loginUser = async (dispatch, credentials) => {
  dispatch(actions.loginStart());

  try {
    const { data } = await login(credentials);
    localStorage.setItem(tokenKey, data.token);
    data.user.role === 'admin' && dispatch(actions.loginSuccess(data));
  } catch (err) {
    dispatch(actions.loginFailure());
    console.log(err.response);
  }
};

export const registerUser = async (dispatch, credentials) => {
  dispatch(actions.registerUserStart());

  try {
    const {
      data: { user },
    } = await userService.register(credentials);

    dispatch(actions.registerUserSuccess(user));
  } catch (err) {
    dispatch(actions.registerUserFailure());
    console.log(err.response);
  }
};

export const fetchUsers = async (dispatch) => {
  dispatch(actions.getUsersStart());

  try {
    const {
      data: { users },
    } = await userService.getAllUsers();

    dispatch(actions.getUsersSuccess(users));
  } catch (err) {
    dispatch(actions.getUsersFailure());
    console.log(err.response);
  }
};

export const updateUser = async (dispatch, id, updUser) => {
  dispatch(actions.updateUserStart());

  try {
    const {
      data: { doc: user },
    } = await userService.editUser(id, updUser);

    dispatch(actions.updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(actions.updateUserFailure());
    console.log(err.response);
  }
};

export const removeUser = async (dispatch, id) => {
  dispatch(actions.deleteUserStart());

  try {
    await userService.deleteUser(id);
    dispatch(actions.deleteUserSuccess(id));
  } catch (err) {
    dispatch(actions.deleteUserFailure());
    console.log(err.response);
  }
};
