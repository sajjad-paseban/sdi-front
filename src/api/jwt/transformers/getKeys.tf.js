import moment from "jalali-moment";
export function getKeysTransformer(inputValidated) {
    return inputValidated.map((item) => {
        const x = new Date(item.start_time * 1000).toLocaleDateString('en-US');
        const y = new Date(item.expire * 1000).toLocaleDateString('en-US');
        return { ...item,
            start_time: moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'),
            expire: moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD')
        };
    });
}
//# sourceMappingURL=getKeys.tf.js.map