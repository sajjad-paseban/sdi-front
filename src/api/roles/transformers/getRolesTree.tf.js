export function getRolesTreeTransformer(inputValidated) {
    const result = addSelectToItems(inputValidated);
    console.log(result, 'transport result');
    return result;
}
function addSelectToItems(items) {
    const result = [];
    items.forEach((item) => {
        let childRes = null;
        if (item.children) {
            childRes = addSelectToItems(item.children);
        }
        result.push({ ...item, selected: [], children: childRes });
    });
    return result;
}
//# sourceMappingURL=getRolesTree.tf.js.map