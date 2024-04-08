import moment from "jalali-moment";
export function getKeyByIdTransformer(inputValidated) {
    const date = [];
    const x = new Date(inputValidated.start_time * 1000).toLocaleDateString('en-US');
    date.push(moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'));
    const y = new Date(inputValidated.expire * 1000).toLocaleDateString('en-US');
    date.push(moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'));
    return {
        ...inputValidated,
        date: date
    };
}
//# sourceMappingURL=getKeyById.tf.js.map