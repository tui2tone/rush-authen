import { AuthActions, AuthActionTypes as ActionTypes } from './auth.actions';
import { initialState, State, AuthState } from './auth.state';

export function reducer(state = initialState, action: AuthActions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                isAuthorized: AuthState.Loading,
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
        default: {
            return state;
        }
    }
}
