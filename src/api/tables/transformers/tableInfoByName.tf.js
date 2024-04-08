export function tableInfoByNameTransformer(inputValidated) {
    return inputValidated.map((item) => {
        return {
            model: item.model,
            pk: item.pk,
            ...item.fields
        };
    });
}
//# sourceMappingURL=tableInfoByName.tf.js.map