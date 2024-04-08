import { ref } from 'vue';
export default function rules() {
    const nameRule = ref([
        (v) => v !== '' || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => JSON.stringify(v) !== '[]' || 'این فیلد نباید خالی باشد',
    ]);
    const requiredRule = ref([
        (v) => v !== '' || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
    ]);
    const floatRule = ref([
        (v) => v !== '' || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
    ]);
    const numberPercent = ref([
        (v) => v !== '' || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v) => v <= 100 || 'این فیلد نباید بیش از 100 باشد',
    ]);
    const textFloat = ref([
        (v) => v !== '' || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => {
            if (new RegExp('[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)').test(v)) {
                return true;
            }
            else {
                return 'شماره معتبر نیست';
            }
        }
    ]);
    const phoneRule = ref([
        (v) => {
            if (new RegExp('^[0-9]{11}$').test(v)) {
                return true;
            }
            else {
                return 'شماره معتبر نیست';
            }
        }
    ]);
    const ipRole = ref([
        (v) => {
            if (new RegExp('^(?!0)(?!.*\\.$)((1?\\d?\\d|25[0-5]|2[0-4]\\d)(\\.|$)){4}$').test(v)) {
                return true;
            }
            else {
                return 'آیپی معتبر نیست';
            }
        }
    ]);
    const textNumber = ref([
        (v) => v !== '' || 'این فیلد نباید خالی باشد',
        (v) => v !== undefined || 'این فیلد نباید خالی باشد',
        (v) => v !== null || 'این فیلد نباید خالی باشد',
        (v) => {
            if (new RegExp('^[0-9]*$').test(v)) {
                return true;
            }
            else {
                return 'شماره معتبر نیست';
            }
        }
    ]);
    const text_number = ref([
        (v) => {
            if (v) {
                if (new RegExp('^[0-9]*$').test(v)) {
                    return true;
                }
                else {
                    return 'شماره معتبر نیست';
                }
            }
            else {
                return true;
            }
        }
    ]);
    return {
        nameRule, floatRule, phoneRule, ipRole, textNumber, text_number, requiredRule, textFloat, numberPercent
    };
}
//# sourceMappingURL=rules_functions.js.map