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
