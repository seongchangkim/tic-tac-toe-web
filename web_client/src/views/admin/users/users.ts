import { defineComponent } from 'vue';
import { callGetApi } from '../../../api/call_rest_api';

const getUsersPath = `api/admin/users`;

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
        getUser() {
            this.user = this.$store.getters['getUser'];
        },
        // 이전 페이지
        async getPrevUserList() {
            const data = await callGetApi({
                path: getUsersPath,
                queryParameter: `page=${this.currentPage - 1}${this.condParam}`,
                token: this.token,
            });

            this.setPageInfo(data);
        },
        // 페이지 선택
        async getUserListBySelectedPage(index: number) {
            const data = await callGetApi({
                path: getUsersPath,
                queryParameter: `page=${index}${this.condParam}`,
                token: this.token,
            });

            this.setPageInfo(data);
        },
        // 다음 페이지
        async getNextUserList() {
            const data = await callGetApi({
                path: getUsersPath,
                queryParameter: `page=${this.currentPage + 1}${this.condParam}`,
                token: this.token,
            });

            this.setPageInfo(data);
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

            const data = await callGetApi({
                path: getUsersPath,
                queryParameter: `page=${this.currentPage}${this.condParam}`,
                token: this.token,
            });

            this.setPageInfo(data);
        },
        // 페이징 처리 공통 메소드
        setPageInfo(data: any) {
            this.users = data.users;
            this.totalPage = data.lastPage;
            this.isFirst = data.page === 1;
            this.isLast = data.page === data.lastPage;
            this.currentPage = data.page;
        },
    },
    async beforeCreate() {
        this.token = this.$cookies.get('x_auth');

        const data = await callGetApi({
            path: getUsersPath,
            queryParameter: undefined,
            token: this.token,
        });

        this.setPageInfo(data);
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.getUser();
    },
});
