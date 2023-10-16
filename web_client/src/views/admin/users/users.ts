import { defineComponent } from 'vue';
import axios from 'axios';
import { defaultApiUrl } from '../../../global/default-api-url';

const url = `${defaultApiUrl}api/admin/users`;

// 테이블 열별 검색 조건 키 타입
type CondKeyType = '닉네임' | '이메일' | '권한' | '소설로그인';

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
            users: [],
            currentPage: 1,
            totalPage: 1,
            isFirst: true,
            isLast: true,
            // 테이블 열별 검색 조건 객체
            // 키-값 구조로 되어 있는데 값은 테이블의 열 이름을 지정해야 함.
            condObj: {
                닉네임: 'nickname',
                이메일: 'email',
                권한: 'authRole',
                소설로그인: 'socialLoginType',
            },
            // 테이블 열별 검색 조건 키
            condKey: '',
            // 테이블 열별 검색 조건 값
            cond: '',
            // 테이블 열별 검색 조건 종류 toggle 여부
            showCond: false,
            // 검색 키워드
            keyword: '',
            // 검색 쿼리 파라미터
            condParam: '',
            // x_auth token
            token: '',
        };
    },
    methods: {
        moveBackPage() {
            this.$router.back();
        },
        getUser() {
            this.user = this.$store.getters['getUser'];
        },
        // 이전 페이지
        async getPrevUserList() {
            const res = await axios.get(
                `${url}?page=${this.currentPage - 1}${this.condParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            this.setPageInfo(res);
        },
        // 페이지 선택
        async getUserListBySelectedPage(index: number) {
            const res = await axios.get(
                `${url}?page=${index}${this.condParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            this.setPageInfo(res);
        },
        // 다음 페이지
        async getNextUserList() {
            const res = await axios.get(
                `${url}?page=${this.currentPage + 1}${this.condParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            this.setPageInfo(res);
        },
        // 검색 카테고리 선택
        onSearchCategoryClick() {
            this.showCond = !this.showCond;
        },
        // 검색 카테고리 중 하나 선택
        onSelectSearchCategory(key: CondKeyType) {
            this.condKey = key;
            this.cond = this.condObj[key];
            this.showCond = false;
        },
        // 검색 카테고리 별로 회원 목록 검색
        async onSearchKeyWord(keyword: string) {
            if (this.cond === '') {
                alert('검색 카테고리를 선택하세요!');
                return;
            }

            this.condParam = `&cond=${this.cond}&keyword=${keyword}`;
            const res = await axios.get(
                `${url}?page=${this.currentPage}${this.condParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            this.setPageInfo(res);
        },
        // 페이징 처리 공통 메소드
        setPageInfo(res: any) {
            this.users = res.data['users'];
            this.totalPage = res.data['lastPage'];
            this.isFirst = res.data['page'] === 1;
            this.isLast = res.data['page'] === res.data['lastPage'];
            this.currentPage = res.data['page'];
        },
    },
    async beforeCreate() {
        this.token = this.$cookies.get('x_auth');

        console.log(this.token);
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        this.setPageInfo(res);
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.getUser();
    },
});
