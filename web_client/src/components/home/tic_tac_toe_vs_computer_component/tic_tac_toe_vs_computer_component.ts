import { defineComponent } from 'vue';
import game_event_btn from '../game_event_btn/game_event_btn.vue';

interface WinConditionType {
    cond1: string;
    cond2: string;
    cond3: string;
    player: string;
}

interface NormalComputerMoveType {
    checkBox1: string;
    checkBox2: string;
    checkBox3: string;
    player: string;
}

export default defineComponent({
    name: 'TicTacToeVsComputerComponent',
    components: {
        GameEventBtn: game_event_btn,
    },
    data() {
        return {
            boxes: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            currentPlayer: 'X',
            gameOver: false,
            gameStart: false,
            computerDiffcultOption: [1, 2, 3],
            selectComputerDiffcultOption: 1,
        };
    },
    methods: {
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

                        // 컴퓨터가 승리 여부 체크
                        this.computerWinAlert();
                        return;
                    }
                }
            }
        },
        // normal AI 셀 선택
        normalComputerMove() {
            // 승리 가능한 경우: 가로, 세로, 대각선 중 하나에서 승리 가능한 경우를 찾습니다.
            for (let i = 0; i < 3; i++) {
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[i][0],
                        checkBox2: this.boxes[i][1],
                        checkBox3: this.boxes[i][2],
                        player: 'O',
                    })
                ) {
                    this.boxes[i][2] = 'O'; // 왼쪽에서 오른쪽으로 가로로 승리 가능
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[i][0],
                        checkBox2: this.boxes[i][2],
                        checkBox3: this.boxes[i][1],
                        player: 'O',
                    })
                ) {
                    this.boxes[i][1] = 'O'; // 가운데에서 가로로 승리 가능
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[i][1],
                        checkBox2: this.boxes[i][2],
                        checkBox3: this.boxes[i][0],
                        player: 'O',
                    })
                ) {
                    this.boxes[i][0] = 'O'; // 오른쪽에서 왼쪽으로 가로로 승리 가능
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[0][i],
                        checkBox2: this.boxes[1][i],
                        checkBox3: this.boxes[2][i],
                        player: 'O',
                    })
                ) {
                    this.boxes[2][i] = 'O'; // 위에서 아래로 세로로 승리 가능
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[0][i],
                        checkBox2: this.boxes[2][i],
                        checkBox3: this.boxes[1][i],
                        player: 'O',
                    })
                ) {
                    this.boxes[1][i] = 'O'; // 중앙에서 세로로 승리 가능
                    this.computerWinAlert();
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[1][i],
                        checkBox2: this.boxes[2][i],
                        checkBox3: this.boxes[0][i],
                        player: 'O',
                    })
                ) {
                    this.boxes[0][i] = 'O'; // 아래에서 위로 세로로 승리 가능
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
            }

            // 상대방이 승리 가능한 경우 방지: 가로, 세로, 대각선 중 하나에서 상대방이 승리 가능한 경우를 방지합니다.
            for (let i = 0; i < 3; i++) {
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[i][0],
                        checkBox2: this.boxes[i][1],
                        checkBox3: this.boxes[i][2],
                        player: this.currentPlayer,
                    })
                ) {
                    this.boxes[i][2] = 'O';
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[i][0],
                        checkBox2: this.boxes[i][2],
                        checkBox3: this.boxes[i][1],
                        player: this.currentPlayer,
                    })
                ) {
                    this.boxes[i][1] = 'O';
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[i][1],
                        checkBox2: this.boxes[i][2],
                        checkBox3: this.boxes[i][0],
                        player: this.currentPlayer,
                    })
                ) {
                    this.boxes[i][0] = 'O';
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[0][i],
                        checkBox2: this.boxes[1][i],
                        checkBox3: this.boxes[2][i],
                        player: this.currentPlayer,
                    })
                ) {
                    this.boxes[2][i] = 'O';
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[0][i],
                        checkBox2: this.boxes[2][i],
                        checkBox3: this.boxes[1][i],
                        player: this.currentPlayer,
                    })
                ) {
                    this.boxes[1][i] = 'O';
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
                    return;
                }
                if (
                    this.checkNormalComputerMove({
                        checkBox1: this.boxes[1][i],
                        checkBox2: this.boxes[2][i],
                        checkBox3: this.boxes[0][i],
                        player: this.currentPlayer,
                    })
                ) {
                    this.boxes[0][i] = 'O';
                    this.computerWinAlert(); // 컴퓨터가 승리 여부 체크
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

            this.computerWinAlert(); // 컴퓨터가 승리 여부 체크

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
        // Normal 난이도 컴퓨터 움직임 체크
        checkNormalComputerMove({
            checkBox1,
            checkBox2,
            checkBox3,
            player,
        }: NormalComputerMoveType) {
            return (
                checkBox1 === player && checkBox2 === player && checkBox3 === ''
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
        computerWinAlert() {
            if (this.checkWin('O')) {
                this.gameOver = true;
                alert('O win!');
            }
        },
    },
});
