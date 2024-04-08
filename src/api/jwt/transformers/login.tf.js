export function loginTransformer(inputValidated) {
    const role = { ...inputValidated.role, accessRoutes: [], accessApis: [] };
    const result = { ...inputValidated, role: role };
    console.log(result, 'transport result');
    return result;
}
//# sourceMappingURL=login.tf.js.map