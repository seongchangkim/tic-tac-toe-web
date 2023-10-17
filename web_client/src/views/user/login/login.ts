import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';
import { defineComponent } from 'vue';
import user_input_form from '../../../components/user/user_input_form/user_input_form.vue';
import user_btn from '../../../components/user/user_btn/user_btn.vue';
import social_login_btn from '../../../components/user/social_login_btn/social_login_btn.vue';

interface LoginFormParam {
    email: string;
    password: string;
}

export default defineComponent({
    components: {
        UserInputForm: user_input_form,
        UserBtn: user_btn,
        SocialLoginBtn: social_login_btn,
    },
    data() {
        return {
            email: '',
            password: '',
            validationMessageList: [] as string[],
        };
    },
    methods: {
        async login() {
            if (this.validationMessageList.length > 0)
                this.validationMessageList = [];

            const param: LoginFormParam = {
                email: this.email,
                password: this.password,
            };

            await axios
                .post(`${defaultApiUrl}api/auth/login`, param)
                .then((res) => {
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
                })
                .catch((e) => {
                    const errorData = e.response.data;

                    if (errorData.statusCode === 400) {
                        if (this.email.length > 0) {
                            this.validationMessageList.push(
                                ...this.filterValidationMessages(
                                    errorData.message,
                                    (str: string) =>
                                        str.indexOf(
                                            '이메일 형식을 맞춰서 입력하세요',
                                        ) > -1,
                                ),
                            );
                        }

                        this.validationMessageList.push(
                            ...this.filterValidationMessages(
                                errorData.message,
                                (str: string) => {
                                    return (
                                        str.indexOf('을 입력하세요') > -1 ||
                                        str.indexOf('를 입력하세요') > -1
                                    );
                                },
                            ),
                        );
                    } else if (errorData.statusCode === 404) {
                        alert(errorData.message);
                    }
                });
        },
        checkValidationMessage(i: number) {
            const matchStr = ['이메일', '비밀번호'];
            const check =
                this.validationMessageList.findIndex(
                    (str) => str.indexOf(matchStr[i]) > -1,
                ) > -1;
            return check;
        },
        // 유효성 검사 문구들 중 특정 문자에 대해서 필러링함.
        filterValidationMessages(
            validationMessages: string[],
            cb: (str: string) => boolean,
        ): string[] {
            return validationMessages.filter(cb);
        },
        // 유효성 검사 문구들 중 특정 문자에 대해서 필러링하면서 유효성 검사 문구를 출력함.
        printValidationMessage(
            validationMessages: string[],
            kind: string,
        ): string {
            return validationMessages[
                validationMessages.findIndex((str) => str.indexOf(kind) > -1)
            ];
        },
        valueChange(value: string, kind: string) {
            if (kind === '이메일') {
                this.email = value;
            } else if (kind === '비밀번호') {
                this.password = value;
            }
        },
    },
});
