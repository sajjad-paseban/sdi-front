export function getAccessWithParentNameTransformer(inputValidated) {
    const result = [];
    inputValidated.forEach((access) => {
        let item;
        if (access.parent) {
            item = {
                ...access,
                parent: access.parent.e_name,
            };
        }
        else {
            item = { ...access, parent: null };
        }
        result.push(item);
    });
    console.log(result, 'transport result');
    return result;
}
//# sourceMappingURL=getAccessWithParentName.tf.js.map