<template>
    <div class="bg-slate-500 h-screen">
        <div v-if="!user.isAuth" class="flex justify-end">
            <router-link to="/auth/login">
                <div
                    class="cursor-default mt-4 mr-4 bg-orange-600 rounded-3xl w-24 h-10 flex justify-center items-center"
                >
                    로그인
                </div>
            </router-link>
        </div>
        <div v-else-if="user.isAuth" class="flex justify-end">
            <div
                @click="logOut()"
                class="cursor-default mt-4 mr-4 bg-orange-600 rounded-3xl w-24 h-10 flex justify-center items-center"
            >
                로그아웃
            </div>
        </div>
        <div class="h-4/6 flex justify-center items-center flex-col">
            <h1 class="text-center my-5 text-2xl font-bold">Tic-Tac-Toe</h1>
            <div class="w-full">
                <div
                    v-for="(row, rowIndex) in boxes"
                    :key="rowIndex"
                    class="flex justify-center items-center"
                >
                    <div
                        v-for="(cell, colIndex) in row"
                        :key="colIndex"
                        class="bg-white w-24 h-24 m-2 flex justify-center items-center text-6xl font-bold"
                        @click="makeMove(rowIndex, colIndex)"
                    >
                        {{ cell }}
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <GameEventBtn
                v-if="gameStart"
                text="다시 시작"
                styledClassName="bg-red-700"
                :func="resetGame"
            />
            <GameEventBtn
                v-if="!gameStart"
                text="시작"
                styledClassName="bg-blue-600"
                :func="gameStartEvent"
            />
        </div>
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import game_event_btn from '../components/home/game_event_btn/game_event_btn.vue';

export default defineComponent({
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
            },
            boxes: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            currentPlayer: 'X',
            gameOver: false,
            gameStart: false,
        };
    },
    methods: {
        getUser() {
            this.user = this.$store.getters['getUser'];
        },
        // 빈 객체 체크
        isEmptyObject(obj: object): boolean {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        },
        logOut() {
            this.$cookies.remove('x_auth');
            this.$store.commit('setUser', {
                userId: '',
                nickname: '',
                tel: '',
                authRole: '',
                isAuth: false,
            });
            console.log(this.$store.getters['getUser']);
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
            console.log('game Start!');
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
                    this.boxes[i][0] === player &&
                    this.boxes[i][1] === player &&
                    this.boxes[i][2] === player
                ) {
                    return true;
                }
                if (
                    this.boxes[0][i] === player &&
                    this.boxes[1][i] === player &&
                    this.boxes[2][i] === player
                ) {
                    return true;
                }
            }
            if (
                this.boxes[0][0] === player &&
                this.boxes[1][1] === player &&
                this.boxes[2][2] === player
            ) {
                return true;
            }
            if (
                this.boxes[0][2] === player &&
                this.boxes[1][1] === player &&
                this.boxes[2][0] === player
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
                let computorChance = true;
                let rowIndex = 0;
                let colIndex = 0;

                while (computorChance) {
                    // console.log('computer chance');
                    rowIndex = Math.floor(Math.random() * 3);
                    colIndex = Math.floor(Math.random() * 3);

                    if (this.boxes[rowIndex][colIndex] === '') {
                        // console.log('computer check');
                        // console.log(
                        //     `rowIndex : ${rowIndex}, colIndex : ${colIndex}`,
                        // );
                        this.boxes[rowIndex][colIndex] = 'O';
                        // console.table(this.boxes);
                        computorChance = false;
                        return;
                    }
                }
            }
        },
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.getUser();
    },
});
</script>
