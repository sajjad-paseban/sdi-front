import moment from "jalali-moment";
export function getLogsTransformer(inputValidated) {
    return inputValidated.map((item) => {
        let x2 = null;
        const x = new Date(item.created_at * 1000).toLocaleDateString('en-US');
        x2 = moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD');
        return { ...item, created_at: x2 };
    });
}
//# sourceMappingURL=getLogs.tf.js.map