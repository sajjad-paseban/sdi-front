import moment from "jalali-moment";
export function getIpByIdTransformer(inputValidated) {
    const date = [];
    if (inputValidated.active_time_start && inputValidated.active_time_end) {
        const x = new Date(inputValidated.active_time_start * 1000).toLocaleDateString('en-US');
        date.push(moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'));
        const y = new Date(inputValidated.active_time_end * 1000).toLocaleDateString('en-US');
        date.push(moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'));
    }
    return {
        ...inputValidated,
        date: date,
        user: inputValidated.user
    };
}
//# sourceMappingURL=getIpById.tf.js.map