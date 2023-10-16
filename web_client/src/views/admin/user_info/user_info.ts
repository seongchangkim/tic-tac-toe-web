import { defineComponent } from 'vue';
import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';
import user_info_input_form from '../../../components/admin/user_info_input_form/user_info_input_form.vue';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default defineComponent({
    components: {
        UserInfoInputForm: user_info_input_form,
    },
    data() {
        return {
            user: {
                email: '',
                nickname: '',
                tel: '',
                authRole: '',
                socialLoginType: '',
                profileUrl: '',
            },
            file: {} as Blob,
            token: '',
        };
    },
    props: {
        userId: String,
    },
    async beforeCreate() {
        const userId = this.$route.params.userId;
        this.token = this.$cookies.get('x_auth');

        const res = await axios.get(
            `${defaultApiUrl}api/admin/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            },
        );

        this.user = res.data;
    },
    methods: {
        // 빈 객체 체크
        isEmptyObject(obj: object) {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        },
        valueChange(value: string, kind: string) {
            if (kind === '닉네임') {
                this.user.nickname = value;
            } else if (kind === '전화번호') {
                this.user.tel = value;
            }
        },
        // 프로필 사진 변경
        onChangeProfileImage(event: any) {
            const file = event.target.files || event.dataTransfer.files;

            this.file = file[0];

            this.user.profileUrl = URL.createObjectURL(this.file);
        },
        // 회원 수정
        async onUserEditing() {
            const userId = this.$route.params.userId;

            const { nickname, tel, profileUrl, authRole } = this.user;

            if (this.isEmptyObject(this.file)) {
                const params = {
                    nickname,
                    tel,
                    profileUrl,
                    authRole,
                };

                this.userEditingProcess(params);
            } else {
                const storage = getStorage();
                const mountainsRef = ref(
                    storage,
                    `profiles/${userId}/${this.file.name}`,
                );
                uploadBytes(mountainsRef, this.file).then(async (snapshot) => {
                    const getUpLoadImageURL = await getDownloadURL(
                        snapshot.ref,
                    );

                    const params = {
                        nickname,
                        tel,
                        profileUrl: getUpLoadImageURL,
                        authRole,
                    };

                    this.userEditingProcess(params);
                });
            }
        },
        // 회원 수정 공통 처리 메소드
        async userEditingProcess(params: any) {
            const userId = this.$route.params.userId;

            const res = await axios.patch(
                `${defaultApiUrl}api/admin/user/${userId}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            const data = res.data;

            if (data.isSuccess) {
                alert(data.message);
                window.location.reload();
            } else if (data.status === 404) {
                alert(data.message);
            }
        },
    },
});
