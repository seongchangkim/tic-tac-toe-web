import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        btnText: {
            type: String,
            required: true,
        },
        addStyleClass: {
            type: String,
            required: true,
        },
        cb: {
            type: Function,
            required: true,
        },
    },
});
