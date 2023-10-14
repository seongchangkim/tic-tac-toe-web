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
        <div v-else-if="user.isAuth" class="flex items-end flex-col">
            <div class="flex -space-x-2 overflow-hidden justify-end">
                <img
                    class="inline-block h-10 w-10 m-3 rounded-full ring-2 ring-white"
                    :src="
                        user.profileUrl !== null
                            ? user.profileUrl
                            : require('@/assets/icons/default-user-profile.png')
                    "
                    @click="onClickToggle"
                />
            </div>
            <div
                v-if="clickToggle"
                class="w-48 mr-4 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
            >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <!-- <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                    >Your Profile</a
                > -->
                <div
                    v-if="user.authRole === '관리자'"
                    class="block px-4 py-2 text-sm text-gray-700 cursor-default"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                    @click="moveAdminPage"
                >
                    관리자 페이지
                </div>
                <div
                    class="block px-4 py-2 text-sm text-gray-700 cursor-default"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                    @click="logOut()"
                >
                    로그아웃
                </div>
            </div>
        </div>
        <div class="h-4/6 flex justify-center items-center flex-col">
            <h1 id="main_title" class="text-center my-5 text-2xl font-bold">
                Tic-Tac-Toe
            </h1>
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
        // 프로필 경로를 통해 프로필 이미지 가져오기
        getImageUrl(path: string) {
            const url =
                path !== null
                    ? path
                    : '/src/assets/icons/default-user-profile.png';
            console.log(new URL(url, import.meta.url));
            return new URL(url, import.meta.url).pathname;
        },
        moveAdminPage() {
            this.$router.push('/admin');
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');

#main_title {
    font-family: 'Pixelify Sans', sans-serif;
}
</style>
