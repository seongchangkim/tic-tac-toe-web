import { createStore } from 'vuex';
import { UserStore, UserStateType } from './user';
import VuexPersistence from 'vuex-persist';

export interface RootState {
    UserStore: UserStateType;
}

const vuexLocal = new VuexPersistence<RootState>({
    storage: window.localStorage,
    modules: ['userStore'],
});

export default createStore({
    modules: {
        userStore: UserStore,
    },
    plugins: [vuexLocal.plugin],
});
