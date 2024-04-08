export function getEnumsTableTransformer(inputValidated) {
    return inputValidated.map((item) => {
        if (!item.title) {
            item.title = 'نامشخص';
        }
        return item;
    });
}
//# sourceMappingURL=getEnumsTable.tf.js.map