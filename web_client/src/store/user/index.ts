import { Module } from 'vuex';
import { RootState } from '../index';

interface UserType {
    userId: string;
    nickname: string;
    tel: string;
    authRole: string;
    isAuth: boolean;
    socialLoginType: string;
    profileUrl: string;
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
            socialLoginType: '',
            profileUrl: '',
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
