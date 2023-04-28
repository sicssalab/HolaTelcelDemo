import { Dispatch } from 'redux';

import { AuthActionTypes, User } from './types';

export const loginRequest = () => ({
  type: AuthActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user: User) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const loginUser =
  (phone: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await fetch('./data.json');
      const data = await response.json();

      const user = data.users.find((user: User) => user.phone === phone);

      if (user) dispatch(loginSuccess(user));
      else dispatch(loginFailure('El usuario no existe.'));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
