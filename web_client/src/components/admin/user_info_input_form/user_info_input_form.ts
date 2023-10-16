import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            text: '',
        };
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
        inputType: {
            type: String,
            required: true,
        },
    },
    methods: {
        typeInputValue(e: { target: { value: string } }) {
            this.text = e.target.value;

            this.$emit('inputFormValue', this.text, this.inputType);
        },
    },
    mounted() {
        if (this.value !== '') this.text = this.value;
    },
});
