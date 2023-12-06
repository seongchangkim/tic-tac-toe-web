import { defineComponent } from 'vue';
import game_event_btn from '../game_event_btn/game_event_btn.vue';

export default defineComponent({
    components: {
        GameEventBtn: game_event_btn,
    },
    data() {
        return {
            gameRoomList: [],
        };
    },
    methods: {
        createGameRoomDialog() {
            console.log('create game room');
        },
    },
});
