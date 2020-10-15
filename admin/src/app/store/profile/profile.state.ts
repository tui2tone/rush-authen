import { Profile } from './profile.interface';

export interface State {
    find?: any;
    update?: any;
    resetPassword?: any;
}

export const initialState: State = {
    find: {
        isLoading: false,
        isSuccess: false,
        error: null,
        data: null
    },
    update: {
        isLoading: false,
        isSuccess: false,
        error: null,
        data: null
    },
    resetPassword: {
        isLoading: false,
        isSuccess: false,
        error: null,
        data: null
    }
};
