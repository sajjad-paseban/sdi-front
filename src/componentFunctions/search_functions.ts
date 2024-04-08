import {ref, onMounted} from 'vue';


export enum SearchAddEnumType {
    ADD = 'add',
    NEW = 'new',
    REMOVE = 'remove',
}

export default function search_functions() {
    const addType = ref<SearchAddEnumType>(SearchAddEnumType.NEW)

    const setAddType = (searchType:SearchAddEnumType) => {
        addType.value = searchType
    }

    

    return{
        addType,setAddType
    }
}