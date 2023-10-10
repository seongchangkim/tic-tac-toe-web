import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true,
        },
        styledClassName: {
            type: Number,
            required: true,
        },
        func: {
            type: Function,
        },
    },
});
