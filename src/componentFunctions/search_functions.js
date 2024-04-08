import { ref } from 'vue';
export var SearchAddEnumType;
(function (SearchAddEnumType) {
    SearchAddEnumType["ADD"] = "add";
    SearchAddEnumType["NEW"] = "new";
    SearchAddEnumType["REMOVE"] = "remove";
})(SearchAddEnumType || (SearchAddEnumType = {}));
export default function search_functions() {
    const addType = ref(SearchAddEnumType.NEW);
    const setAddType = (searchType) => {
        addType.value = searchType;
    };
    return {
        addType, setAddType
    };
}
//# sourceMappingURL=search_functions.js.map