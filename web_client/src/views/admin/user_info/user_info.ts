import { defineComponent } from 'vue';
import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';
import user_info_input_form from '../../../components/admin/user_info_input_form/user_info_input_form.vue';

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
        };
    },
    props: {
        userId: String,
    },
    async beforeCreate() {
        const userId = this.$route.params.userId;

        const res = await axios.get(`${defaultApiUrl}api/admin/user/${userId}`);

        this.user = res.data;
    },
    methods: {
        valueChange(value: string, kind: string) {
            if (kind === '닉네임') {
                this.user.nickname = value;
            } else if (kind === '전화번호') {
                this.user.tel = value;
            }
        },
    },
});
