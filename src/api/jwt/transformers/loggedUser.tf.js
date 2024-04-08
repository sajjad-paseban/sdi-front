import moment from "jalali-moment";
export function loggedUserTransformer(inputValidated) {
    return inputValidated.map((item) => {
        let x2 = null;
        let y2 = null;
        const x = new Date(item.created_at * 1000).toLocaleDateString('en-US');
        x2 = moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD');
        const y = new Date(item.expire * 1000).toLocaleDateString('en-US');
        y2 = moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD');
        return { ...item, created_at: x2, expire: y2 };
    });
}
//# sourceMappingURL=loggedUser.tf.js.map