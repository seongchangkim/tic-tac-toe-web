import { defineComponent } from 'vue';
import game_event_btn from '../../components/home/game_event_btn/game_event_btn.vue';

interface WinConditionType {
    cond1: string;
    cond2: string;
    cond3: string;
    player: string;
}
export default defineComponent({
    name: 'Home',
    components: {
        GameEventBtn: game_event_btn,
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
            boxes: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            currentPlayer: 'X',
            gameOver: false,
            gameStart: false,
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
        resetGame() {
            this.boxes = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
            this.currentPlayer = 'X';
            this.gameStart = true;
            this.gameOver = false;
        },
        gameStartEvent() {
            this.gameStart = true;
        },
        makeMove(row: number, col: number) {
            if (!this.gameStart) {
                return;
            }

            if (!this.gameOver && this.boxes[row][col] === '') {
                this.boxes[row][col] = this.currentPlayer;

                if (this.checkWin(this.currentPlayer)) {
                    this.gameOver = true;
                    alert(this.currentPlayer + ' win!');
                } else if (this.checkDraw()) {
                    this.gameOver = true;
                    alert(`It's a draw!`);
                } else {
                    this.computerMove();
                }
            }
        },
        checkWin(player: string): boolean {
            for (let i = 0; i < 3; i++) {
                if (
                    this.checkWinCondition({
                        cond1: this.boxes[i][0],
                        cond2: this.boxes[i][1],
                        cond3: this.boxes[i][2],
                        player,
                    })
                ) {
                    return true;
                }
                if (
                    this.checkWinCondition({
                        cond1: this.boxes[0][i],
                        cond2: this.boxes[1][i],
                        cond3: this.boxes[2][i],
                        player,
                    })
                ) {
                    return true;
                }
            }
            if (
                this.checkWinCondition({
                    cond1: this.boxes[0][0],
                    cond2: this.boxes[1][1],
                    cond3: this.boxes[2][2],
                    player,
                })
            ) {
                return true;
            }
            if (
                this.checkWinCondition({
                    cond1: this.boxes[0][2],
                    cond2: this.boxes[1][1],
                    cond3: this.boxes[2][0],
                    player,
                })
            ) {
                return true;
            }
            return false;
        },
        checkDraw(): boolean {
            return this.boxes.every((row) => row.every((cell) => cell !== ''));
        },
        computerMove() {
            if (!this.gameOver) {
                let computerChance = true;
                let rowIndex = 0;
                let colIndex = 0;

                while (computerChance) {
                    rowIndex = Math.floor(Math.random() * 3);
                    colIndex = Math.floor(Math.random() * 3);

                    if (this.boxes[rowIndex][colIndex] === '') {
                        this.boxes[rowIndex][colIndex] = 'O';
                        computerChance = false;
                        return;
                    }
                }
            }
        },
        checkWinCondition({
            cond1,
            cond2,
            cond3,
            player,
        }: WinConditionType): boolean {
            return cond1 === player && cond2 === player && cond3 === player;
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
