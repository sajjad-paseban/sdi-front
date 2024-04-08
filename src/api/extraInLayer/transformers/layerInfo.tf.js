import moment from "jalali-moment";
export function layerInfoTransformer(inputValidated) {
    const x = new Date(inputValidated.created_at * 1000).toLocaleDateString('en-US');
    const x2 = moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD');
    return { ...inputValidated, created_at: x2 };
}
//# sourceMappingURL=layerInfo.tf.js.map