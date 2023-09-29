import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';
import { defineComponent } from 'vue';

interface SignUpFormParam {
    email: string;
    password: string;
    nickname: string;
    tel: string;
}

export default defineComponent({
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
                                ...errorData.message.filter(
                                    (str: string) =>
                                        str.indexOf('must be an email') > -1,
                                ),
                            );
                        }

                        if (this.password.length > 0) {
                            this.validationMessageList.push(
                                ...errorData.message.filter(
                                    (str: string) => str.indexOf('알파벳') > -1,
                                ),
                            );
                        }

                        if (this.tel.length > 0) {
                            this.validationMessageList.push(
                                ...errorData.message.filter(
                                    (str: string) =>
                                        str.indexOf('valid phone number') >
                                            -1 ||
                                        str.indexOf(
                                            'be longer than or equal to 13 characters',
                                        ) > -1,
                                ),
                            );

                            const telVaildationMessageList =
                                this.validationMessageList.filter(
                                    (str: string) => str.indexOf('tel') > -1,
                                );

                            console.table(this.validationMessageList);
                            console.table(telVaildationMessageList);

                            if (telVaildationMessageList.length > 1) {
                                this.validationMessageList =
                                    this.validationMessageList.filter(
                                        (str: string) =>
                                            str.indexOf(
                                                'be longer than or equal to 13 characters',
                                            ) === -1,
                                    );
                            }
                        }

                        this.validationMessageList.push(
                            ...errorData.message.filter(
                                (str: string) =>
                                    str.indexOf('not be empty') > -1 ||
                                    str.indexOf('입력해주세요') > -1,
                            ),
                        );
                    }

                    console.table(this.validationMessageList);
                });
        },
        checkValidationMessage(i: number) {
            console.table(this.validationMessageList);
            const matchStr = ['email', '비밀번호', 'nickname', 'tel'];
            console.log(i);
            const check =
                this.validationMessageList.findIndex((str) => {
                    console.log(matchStr[i]);
                    console.log(str.indexOf(matchStr[i]) > -1);
                    return str.indexOf(matchStr[i]) > -1;
                }) > -1;
            console.log(
                this.validationMessageList.findIndex(
                    (str) => str.indexOf(matchStr[i]) > -1,
                ),
            );
            console.log(check);
            return check;
        },
    },
});
