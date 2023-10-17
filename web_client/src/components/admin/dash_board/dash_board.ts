import { defineComponent } from 'vue';
// import axios from 'axios';
// import { defaultApiUrl } from '../../../global/default-api-url';

// const url = `${defaultApiUrl}api/admin/users`;

// 테이블 열별 검색 조건 키 타입
// type CondKeyType = '닉네임' | '이메일' | '권한' | '소설로그인';

export default defineComponent({
    data() {
        return {
            user: {
                user_id: '',
                nickname: '',
                tel: '',
                authRole: '',
                isAuth: false,
                socialLoginType: '',
                profileUrl: '',
            },
        };
    },
    methods: {
        moveHomePage() {
            this.$router.push('/');
        },
        getUser() {
            this.user = this.$store.getters['getUser'];
        },
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.getUser();
    },
});
