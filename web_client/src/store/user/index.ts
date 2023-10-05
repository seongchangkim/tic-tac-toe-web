import { Module } from 'vuex';
import { RootState } from '../index';

interface UserType {
    userId: string;
    nickname: string;
    tel: string;
    authRole: string;
    isAuth: boolean;
}

export interface UserStateType {
    user: UserType;
}

export const UserStore: Module<UserStateType, RootState> = {
    state: {
        user: {
            userId: '',
            nickname: '',
            tel: '',
            authRole: '',
            isAuth: false,
        },
    },
    getters: {
        getUser: (state: UserStateType): UserType => {
            return state.user;
        },
    },
    mutations: {
        setUser: (state: UserStateType, payload: UserType) => {
            state.user = payload;
        },
    },
};
