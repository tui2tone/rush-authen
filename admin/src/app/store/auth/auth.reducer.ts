import { AuthActions, AuthActionTypes as ActionTypes } from './auth.actions';
import { initialState, State, AuthState } from './auth.state';

export function reducer(state = initialState, action: AuthActions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                isAuthorized: AuthState.Checking,
                permissions: []
            }
        }
        case ActionTypes.LOAD_SUCCESS: {
            return {
                ...state,
                isAuthorized: AuthState.Authorized,
                permissions: action.payload.permissions
            }
        }
        case ActionTypes.LOAD_FAILURE: {
            return {
                ...state,
                isAuthorized: AuthState.Unauthorized,
                permissions: []
            }
        }
        case ActionTypes.SIGNIN_REQUEST: {
            return {
                ...state,
                isAuthorized: AuthState.Checking,
                signin: {
                    isSuccess: false,
                    isLoading: true,
                    error: null,
                    data: null
                }
            };
        }
        case ActionTypes.SIGNIN_SUCCESS: {
            return {
                ...state,
                isAuthorized: AuthState.Authorized,
                permissions: action.payload.permissions,
                user: action.payload.user,
                signin: {
                    isSuccess: true,
                    isLoading: false,
                    error: null,
                    data: {
                        ...action.payload
                    }
                }
            };
        }
        case ActionTypes.SIGNIN_FAILURE: {
            return {
                ...state,
                isAuthorized: AuthState.Unauthorized,
                signin: {
                    isSuccess: false,
                    isLoading: false,
                    error: action.payload,
                    data: null
                }
            };
        }
        case ActionTypes.SIGNOUT_REQUEST: {
            return {
                ...state,
                signout: {
                    isSuccess: false,
                    isLoading: true,
                    error: null,
                    data: null
                }
            };
        }
        case ActionTypes.SIGNOUT_SUCCESS: {
            return {
                ...state,
                isAuthorized: AuthState.Unauthorized,
                signout: {
                    isSuccess: true,
                    isLoading: false,
                    error: null,
                    data: null
                }
            };
        }
        case ActionTypes.SIGNOUT_FAILURE: {
            return {
                ...state,
                signout: {
                    isSuccess: false,
                    isLoading: false,
                    error: action.error,
                    data: null
                }
            };
        }
        default: {
            return state;
        }
    }
}
