export function getExternalApiByIdTransformer(inputValidated) {
    return { ...inputValidated, headers: inputValidated.api_headers, params: inputValidated.api_params };
}
//# sourceMappingURL=getExternalApiById.tf.js.map