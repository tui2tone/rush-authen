import {
    ProfileActions,
    ProfileActionTypes as ActionTypes
} from './profile.actions';
import { initialState, State } from './profile.state';
import { Profile } from './profile.interface';

export function reducer(state = initialState, action: ProfileActions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                find: {
                    ...state.find,
                    isLoading: true,
                    error: null
                }
            };
        }
        case ActionTypes.LOAD_SUCCESS: {
            return {
                ...state,
                find: {
                    ...state.find,
                    isLoading: false,
                    error: null,
                    data: new Profile(action.profile)
                }
            };
        }
        case ActionTypes.LOAD_FAILURE: {
            return {
                ...state,
                find: {
                    ...state.find,
                    isLoading: false,
                    error: action.error
                }
            };
        }
        case ActionTypes.UPDATE_REQUEST: {
            return {
                ...state,
                update: {
                    ...state.update,
                    isLoading: true,
                    error: null
                }
            };
        }
        case ActionTypes.UPDATE_SUCCESS: {
            return {
                ...state,
                update: {
                    ...state.update,
                    isLoading: false,
                    error: null,
                    data: new Profile(action.profile)
                }
            };
        }
        case ActionTypes.UPDATE_FAILURE: {
            return {
                ...state,
                update: {
                    ...state.update,
                    isLoading: false,
                    error: action.error
                }
            };
        }

        case ActionTypes.RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPassword: {
                    isSuccess: false,
                    isLoading: true,
                    error: null,
                    data: null
                }
            };
        }
        case ActionTypes.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPassword: {
                    isSuccess: true,
                    isLoading: false,
                    error: null,
                    data: {
                        ...action.payload
                    }
                }
            };
        }
        case ActionTypes.RESET_PASSWORD_FAILURE: {
            return {
                ...state,
                resetPassword: {
                    isSuccess: false,
                    isLoading: false,
                    error: action.payload
                }
            };
        }
        default: {
            return state;
        }
    }
}