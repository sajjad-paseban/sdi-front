export function getInitBlockInfoTransformer(inputValidated) {
    const res = [];
    inputValidated.map((item) => {
        const data = item.update_date.split(' ');
        if (data.length > 1) {
            res.push({ ...item, update_date: data[0], update_time: data[1] });
        }
    });
    return res;
}
//# sourceMappingURL=getInitBlockInfo.tf.js.map