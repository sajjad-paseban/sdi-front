export function getExternalApisTransformer(inputValidated) {
    return inputValidated.map((item) => {
        return { ...item, headers: item.api_headers, params: item.api_params };
    });
}
//# sourceMappingURL=getExternalApis.tf.js.map