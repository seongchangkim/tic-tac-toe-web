import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UserInputForm',
    data() {
        return {
            value: '',
            validateText: this.validationText ?? '',
            checkvalidate: this.checkValidationText,
        };
    },
    props: {
        kind: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        text: String,
    },
    methods: {
        typeInputValue(e: { target: { value: string } }) {
            // if (this.kind === '전화번호') {
            //     this.getPhoneNumber(e.target.value);
            // } else {
            this.value = e.target.value;
            // }

            this.$emit('inputFormValue', this.value, this.kind);
        },
        // 전화번호 형식
        getPhoneNumber(phoneNumber: string) {
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

            if (phoneNumber.length < 4) {
                this.value = phoneNumber;
            } else if (phoneNumber.length === 4) {
                this.value = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
                    3,
                )}`;
            } else if (phoneNumber.length === 7) {
                this.value = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
                    3,
                    6,
                )}-${phoneNumber.slice(6)}`;
            }
        },
        checkVaildationImageKind(inputKind: string): boolean {
            return this.kind === inputKind;
        },
    },
    mounted() {
        if (this.text !== undefined) this.value = this.text;
    },
});
