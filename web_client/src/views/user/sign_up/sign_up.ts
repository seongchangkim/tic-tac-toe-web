import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';
import { defineComponent } from 'vue';
import user_input_form from '../../../components/user/user_input_form/user_input_form.vue';
import user_btn from '../../../components/user/user_btn/user_btn.vue';

interface SignUpFormParam {
    email: string;
    password: string;
    nickname: string;
    tel: string;
}

export default defineComponent({
    components: {
        UserInputForm: user_input_form,
        UserBtn: user_btn,
    },
    data() {
        return {
            email: '',
            password: '',
            nickname: '',
            tel: '',
            validationMessageList: [] as string[],
        };
    },
    methods: {
        async signUp() {
            if (this.validationMessageList.length > 0)
                this.validationMessageList = [];

            const param: SignUpFormParam = {
                email: this.email,
                password: this.password,
                nickname: this.nickname,
                tel: this.tel,
            };

            await axios
                .post(`${defaultApiUrl}api/auth/sign-up`, param, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
                        alert('회원가입 완료되었습니다');
                    } else if (!data.success) {
                        alert(data.errorMessage);
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

                        if (this.password.length > 0) {
                            this.validationMessageList.push(
                                ...this.filterValidationMessages(
                                    errorData.message,
                                    (str: string) => str.indexOf('알파벳') > -1,
                                ),
                            );
                        }

                        if (this.tel.length > 0) {
                            this.validationMessageList.push(
                                ...this.filterValidationMessages(
                                    errorData.message,
                                    (str: string) =>
                                        str.indexOf(
                                            '전화번호 형식을 맞춰서 입력하세요',
                                        ) > -1 ||
                                        str.indexOf(
                                            '입력하고자 전화번호 13자 이상을 입력하세요',
                                        ) > -1,
                                ),
                            );

                            const telVaildationMessageList =
                                this.filterValidationMessages(
                                    this.validationMessageList,
                                    (str: string) =>
                                        str.indexOf('전화번호') > -1,
                                );

                            if (telVaildationMessageList.length > 1) {
                                this.validationMessageList =
                                    this.filterValidationMessages(
                                        this.validationMessageList,
                                        (str: string) =>
                                            str.indexOf(
                                                '입력하고자 전화번호 13자 이상을 입력하세요',
                                            ) === -1,
                                    );
                            }
                        }

                        this.validationMessageList.push(
                            ...this.filterValidationMessages(
                                errorData.message,
                                (str: string) => {
                                    return (
                                        (str.indexOf('을 입력하세요') > -1 ||
                                            str.indexOf('를 입력하세요') >
                                                -1) &&
                                        str.indexOf(
                                            '입력하고자 전화번호 13자 이상을 입력하세요',
                                        ) === -1
                                    );
                                },
                            ),
                        );
                    }
                });
        },
        checkValidationMessage(i: number) {
            const matchStr = ['이메일', '비밀번호', '닉네임', '전화번호'];
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
            } else if (kind === '닉네임') {
                this.nickname = value;
            } else if (kind === '전화번호') {
                this.tel = value;
            }
        },
    },
});
