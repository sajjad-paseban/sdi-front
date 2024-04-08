//T1:تایپ دیتای خروجی مورد نظر ما
export function getAccessTransformer(inputValidated) {
    const result = [];
    inputValidated.forEach((access) => {
        result.push({ ...access });
    });
    console.log(result, 'transport result');
    return result;
}
//# sourceMappingURL=getAccess.tf.js.map