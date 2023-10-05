<template>
    <div class="home">
        <div v-if="!user.isAuth" class="flex justify-end">
            <router-link to="/auth/login">
                <span class="cursor-default mr-4">로그인</span>
            </router-link>
        </div>
        <div v-else-if="user.isAuth" class="flex justify-end">
            <div @click="logOut()" class="cursor-default mr-4">로그아웃</div>
        </div>
        <div class="flex justify-end"></div>
        <img alt="Vue logo" src="../assets/logo.png" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            user: {
                user_id: '',
                nickname: '',
                tel: '',
                authRole: '',
                isAuth: false,
            },
        };
    },
    methods: {
        getUser() {
            this.user = this.$store.getters['getUser'];
            console.log(this.user);
        },
        // 빈 객체 체크
        isEmptyObject(obj: object): boolean {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        },
        logOut() {
            this.$cookies.remove('x_auth');
            this.$store.commit('setUser', {
                userId: '',
                nickname: '',
                tel: '',
                authRole: '',
                isAuth: false,
            });
            console.log(this.$store.getters['getUser']);
            this.getUser();
            this.$router.go(0);
        },
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.getUser();
    },
});
</script>
