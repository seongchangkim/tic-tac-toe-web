import { defineComponent } from 'vue';
import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';

export default defineComponent({
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
        // 이미지 가져오기
        getImageUrl(url: string) {
            return new URL(url, import.meta.url).href;
        },
    },
});
