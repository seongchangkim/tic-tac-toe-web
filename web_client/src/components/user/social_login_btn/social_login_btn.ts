import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true,
        },
        textStyleClass: {
            type: String,
        },
        bgStyleClass: {
            type: String,
            required: true,
        },
        imgStyleClass: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    methods: {
        // 소셜 로그인
        socialLogin() {
            if (this.type === 'KAKAO') {
                (window as any).Kakao.Auth.authorize({
                    redirectUri: process.env.VUE_APP_KAKAO_REDIRECT_URL,
                });
            } else if (this.type === 'GOOGLE') {
                location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.VUE_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=email profile`;
            }
        },
    },
});
