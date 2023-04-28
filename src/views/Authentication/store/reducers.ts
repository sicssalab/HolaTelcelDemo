import { AuthActionTypes, AuthState } from './actions';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: any
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case AuthActionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};
