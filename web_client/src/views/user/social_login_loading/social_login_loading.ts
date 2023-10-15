import { defineComponent } from 'vue';
import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';

// 소셜 로그인 API Request 파라미터 타입
interface SocialLoginReqParam {
    nickname: string;
    email: string;
    profileUrl: string;
    accessToken: string;
}

export default defineComponent({
    methods: {
        async socialLoginProcess(code: string, type: string) {
            if (type === 'KAKAO') {
                const formUrlEncoded = (x: any) =>
                    Object.keys(x)
                        .map(
                            (k) =>
                                encodeURIComponent(k) +
                                '=' +
                                encodeURIComponent(x[k]),
                        )
                        .join('&');
                const oauthToken = await axios.post(
                    'https://kauth.kakao.com/oauth/token',
                    formUrlEncoded({
                        grant_type: 'authorization_code',
                        client_id: process.env.VUE_APP_KAKAO_REST_API_KEY,
                        redirect_uri: process.env.VUE_APP_KAKAO_REDIRECT_URL,
                        code,
                    }),
                    {
                        headers: {
                            'Content-type':
                                'application/x-www-form-urlencoded;charset=utf-8',
                        },
                    },
                );

                const { access_token } = oauthToken.data;

                (window as any).Kakao.Auth.setAccessToken(access_token);

                const profileInfo = await (window as any).Kakao.API.request({
                    url: '/v2/user/me',
                });

                const {
                    email,
                    profile: { nickname, profile_image_url },
                } = profileInfo.kakao_account;

                const params: SocialLoginReqParam = {
                    email,
                    nickname,
                    profileUrl: profile_image_url,
                    accessToken: access_token,
                };

                this.socialLogin(params, type);
            } else if (type === 'GOOGLE') {
                const getTokenRes = await axios.post(
                    'https://oauth2.googleapis.com/token',
                    {
                        code,
                        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                        client_secret: process.env.VUE_APP_GOOGLE_CLIENT_SECRET,
                        redirect_uri: process.env.VUE_APP_GOOGLE_REDIRECT_URL,
                        grant_type: 'authorization_code',
                    },
                );

                const { access_token, id_token } = getTokenRes.data;

                const getGoogleProfileRes = await axios.post(
                    `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
                );

                const { email, name, picture } = getGoogleProfileRes.data;

                const params: SocialLoginReqParam = {
                    email,
                    nickname: name,
                    profileUrl: picture,
                    accessToken: access_token,
                };

                this.socialLogin(params, type);
            }
        },
        async socialLogin(params: SocialLoginReqParam, type: string) {
            const res = await axios.post(
                `${defaultApiUrl}api/auth/social-login/${type}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const { accessToken, user, isAuth } = res.data;
            const {
                userId,
                nickname,
                tel,
                authRole,
                socialLoginType,
                profileUrl,
            } = user;

            if (accessToken !== undefined) {
                this.$store.commit('setUser', {
                    userId,
                    nickname,
                    tel,
                    authRole,
                    isAuth,
                    socialLoginType,
                    profileUrl,
                });
                this.$cookies.set('x_auth', accessToken);
                this.$router.push('/');
            }
        },
    },
    created() {
        this.socialLoginProcess(
            `${this.$route.query.code}`,
            `${this.$route.params.type}`,
        );
    },
});
