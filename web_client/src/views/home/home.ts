import { defineComponent } from 'vue';
import tic_tac_toe_vs_computer_component from '../../components/home/tic_tac_toe_vs_computer_component/tic_tac_toe_vs_computer_component.vue';
import game_room_list_component from '../../components/home/game_room_list_component/game_room_list_component.vue';

export default defineComponent({
    name: 'Home',
    components: {
        TicTacToeVsComputerComponent: tic_tac_toe_vs_computer_component,
        GameRoomListComponent: game_room_list_component,
    },
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
            clickToggle: false,
        };
    },
    methods: {
        getUser() {
            this.user = this.$store.getters['getUser'];
        },
        logOut() {
            this.$cookies.remove('x_auth');
            this.$store.commit('setUser', {
                userId: '',
                nickname: '',
                tel: '',
                authRole: '',
                profileUrl: '',
                isAuth: false,
            });
            this.getUser();
            this.$router.go(0);
        },
        onClickToggle() {
            this.clickToggle = !this.clickToggle;
        },
        moveAdminPage() {
            this.$router.push('/admin/users');
        },
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.getUser();
    },
});
