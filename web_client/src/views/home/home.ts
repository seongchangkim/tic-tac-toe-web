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
            computerDiffcultOption: [1, 2, 3],
            selectComputerDiffcultOption: 1,
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
                } else if (this.checkDraw(this.boxes)) {
                    this.gameOver = true;
                    alert(`It's a draw!`);
                } else {
                    // easy 난이도
                    if (this.selectComputerDiffcultOption === 1) {
                        this.easyComputerMove();
                    } else if (this.selectComputerDiffcultOption === 2) {
                        this.normalComputerMove();
                    } else if (this.selectComputerDiffcultOption === 3) {
                        this.hardComputerMove();
                    }
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
        checkDraw(board: string[][]): boolean {
            return board.every((row) => row.every((cell) => cell !== ''));
        },
        // easy AI 셀 선택
        easyComputerMove() {
            console.log('bbbbb');

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

                        if (this.checkWin('O')) {
                            console.log('computer winner!');
                            this.gameOver = true;
                            alert('O win!');
                        }

                        return;
                    }
                }
            }
        },
        // normal AI 셀 선택
        normalComputerMove() {
            console.log(`O win check : ${this.checkWin('O')}`);

            // 승리 가능한 경우: 가로, 세로, 대각선 중 하나에서 승리 가능한 경우를 찾습니다.
            for (let i = 0; i < 3; i++) {
                if (
                    this.boxes[i][0] === 'O' &&
                    this.boxes[i][1] === 'O' &&
                    this.boxes[i][2] === ''
                ) {
                    this.boxes[i][2] = 'O'; // 왼쪽에서 오른쪽으로 가로로 승리 가능
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[i][0] === 'O' &&
                    this.boxes[i][2] === 'O' &&
                    this.boxes[i][1] === ''
                ) {
                    this.boxes[i][1] = 'O'; // 가운데에서 가로로 승리 가능
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[i][1] === 'O' &&
                    this.boxes[i][2] === 'O' &&
                    this.boxes[i][0] === ''
                ) {
                    this.boxes[i][0] = 'O'; // 오른쪽에서 왼쪽으로 가로로 승리 가능
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[0][i] === 'O' &&
                    this.boxes[1][i] === 'O' &&
                    this.boxes[2][i] === ''
                ) {
                    this.boxes[2][i] = 'O'; // 위에서 아래로 세로로 승리 가능
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[0][i] === 'O' &&
                    this.boxes[2][i] === 'O' &&
                    this.boxes[1][i] === ''
                ) {
                    this.boxes[1][i] = 'O'; // 중앙에서 세로로 승리 가능
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[1][i] === 'O' &&
                    this.boxes[2][i] === 'O' &&
                    this.boxes[0][i] === ''
                ) {
                    this.boxes[0][i] = 'O'; // 아래에서 위로 세로로 승리 가능
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
            }

            // 상대방이 승리 가능한 경우 방지: 가로, 세로, 대각선 중 하나에서 상대방이 승리 가능한 경우를 방지합니다.
            for (let i = 0; i < 3; i++) {
                if (
                    this.boxes[i][0] === this.currentPlayer &&
                    this.boxes[i][1] === this.currentPlayer &&
                    this.boxes[i][2] === ''
                ) {
                    this.boxes[i][2] = 'O';
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[i][0] === 'X' &&
                    this.boxes[i][2] === 'X' &&
                    this.boxes[i][1] === ''
                ) {
                    this.boxes[i][1] = 'O';
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[i][1] === 'X' &&
                    this.boxes[i][2] === 'X' &&
                    this.boxes[i][0] === ''
                ) {
                    this.boxes[i][0] = 'O';
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[0][i] === 'X' &&
                    this.boxes[1][i] === 'X' &&
                    this.boxes[2][i] === ''
                ) {
                    this.boxes[2][i] = 'O';
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[0][i] === 'X' &&
                    this.boxes[2][i] === 'X' &&
                    this.boxes[1][i] === ''
                ) {
                    this.boxes[1][i] = 'O';
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
                if (
                    this.boxes[1][i] === 'X' &&
                    this.boxes[2][i] === 'X' &&
                    this.boxes[0][i] === ''
                ) {
                    this.boxes[0][i] = 'O';
                    if (this.checkWin('O')) {
                        this.gameOver = true;
                        alert('O win!');
                    }
                    return;
                }
            }

            // 랜덤한 움직임: 위의 경우에 해당하지 않으면 빈 셀 중 하나를 무작위로 선택합니다.
            this.easyComputerMove();

            // 빈 셀이 없는 경우, 즉 무승부
            return;
        },
        // hard AI 셀 선택
        hardComputerMove() {
            // AI 움직임
            const bestMove = this.minimax(this.boxes, 'O');
            this.boxes[bestMove.row][bestMove.col] = 'O';

            if (this.checkWin('O')) {
                console.log('computer winner!');
                this.gameOver = true;
                alert('O win!');
            }

            return;
        },
        // 미니맥스 알고리즘을 사용하여 Computer의 최적의 움직임을 계산하는 메소드.
        minimax(
            board: string[][],
            player: string,
        ): {
            row: number;
            col: number;
            score: number;
        } {
            if (this.checkWin('X')) {
                return {
                    row: 0,
                    col: 0,
                    score: -1,
                };
            } else if (this.checkWin('O')) {
                return {
                    row: 0,
                    col: 0,
                    score: 1,
                };
            } else if (this.checkDraw(board)) {
                return {
                    row: 0,
                    col: 0,
                    score: 0,
                };
            }

            const moves = [];
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (board[row][col] === '') {
                        board[row][col] = player;
                        const move = {
                            row,
                            col,
                            score: this.minimax(
                                board,
                                player === 'X' ? 'O' : 'X',
                            ).score,
                        };
                        moves.push(move);
                        board[row][col] = '';
                    }
                }
            }

            let bestMove;
            if (player === 'O') {
                let bestScore = -Infinity;
                for (const move of moves) {
                    if (move.score > bestScore) {
                        bestScore = move.score;
                        bestMove = move;
                    }
                }
            } else {
                let bestScore = Infinity;
                for (const move of moves) {
                    if (move.score < bestScore) {
                        bestScore = move.score;
                        bestMove = move;
                    }
                }
            }

            return (
                bestMove ?? {
                    row: 0,
                    col: 0,
                    score: 0,
                }
            );
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
