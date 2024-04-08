import {ref, onMounted} from 'vue';

export default function rules() {
    const nameRule = ref([
        (v: string) => v !== '' || 'این فیلد نباید خالی باشد',
        (v: string) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v: string) => v !== null || 'این فیلد نباید خالی باشد',
        (v: any) => JSON.stringify(v) !== '[]' || 'این فیلد نباید خالی باشد',
    ])

    const requiredRule = ref([
        (v: string) => v !== '' || 'این فیلد نباید خالی باشد',
        (v: string) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v: string) => v !== null || 'این فیلد نباید خالی باشد',
        (v: number) => v !== null || 'این فیلد نباید خالی باشد',
        (v: number) => v !== undefined || 'این فیلد نباید خالی باشد',
    ])


    const floatRule = ref([
        (v: string) => v !== '' || 'این فیلد نباید خالی باشد',
        (v: number) => v !== null || 'این فیلد نباید خالی باشد',
        (v: number) => v !== undefined || 'این فیلد نباید خالی باشد',
    ])

    const numberPercent = ref([
        (v: string) => v !== '' || 'این فیلد نباید خالی باشد',
        (v: number) => v !== null || 'این فیلد نباید خالی باشد',
        (v: number) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v: number) => v <= 100 || 'این فیلد نباید بیش از 100 باشد',
    ])

    const textFloat = ref([
        (v: string) => v !== '' || 'این فیلد نباید خالی باشد',
        (v: string) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v: string) => v !== null || 'این فیلد نباید خالی باشد',
        (v: string) => {
            if (
                new RegExp('[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)').test(v)
            ) {
                return true;
            } else {
                return 'شماره معتبر نیست';
            }
        }
    ])

    const phoneRule = ref([
        (v: string) => {
            if (
                new RegExp('^[0-9]{11}$').test(v)
            ) {
                return true;
            } else {
                return 'شماره معتبر نیست';
            }
        }
    ])

    const ipRole = ref([
        (v: string) => {
            if (
                new RegExp('^(?!0)(?!.*\\.$)((1?\\d?\\d|25[0-5]|2[0-4]\\d)(\\.|$)){4}$').test(v)
            ) {
                return true;
            } else {
                return 'آیپی معتبر نیست';
            }
        }
    ])

    const textNumber = ref([
        (v: string) => v !== '' || 'این فیلد نباید خالی باشد',
        (v: string) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v: string) => v !== null || 'این فیلد نباید خالی باشد',
        (v: string) => {
            if (
                new RegExp('^[0-9]*$').test(v)
            ) {
                return true;
            } else {
                return 'شماره معتبر نیست';
            }
        }
    ])

    const text_number = ref([
        (v: string) => {
            if (v) {
                if (
                    new RegExp('^[0-9]*$').test(v)
                ) {
                    return true;
                } else {
                    return 'شماره معتبر نیست';
                }
            } else {
                return true
            }
        }
    ])


    return {
        nameRule, floatRule, phoneRule, ipRole, textNumber, text_number, requiredRule, textFloat,numberPercent
    }
}