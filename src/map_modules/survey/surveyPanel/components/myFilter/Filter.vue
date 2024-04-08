<template>

    <div style="height:100%;width:100%;overflow-y: hidden" class=" pa-1">

        <v-row class="ma-0 pa-0 myForm"
               style="height: calc(100% - 35px);overflow-y: auto;display: flex;align-content: flex-start;">
            <v-col cols="12">
                <p style="font-size:12px" class="font-weight-bold text-blue-darken-4">تنظیمات فیلتر نمایش</p>
            </v-col>
            <v-col cols="12" sm="4" v-for="(item,index) in filterKeys_clone" :key="index">
                <v-text-field
                        v-if="item.type=='string'||item.type=='number'"
                        density="compact"
                        v-model="item.value"
                        variant="solo"
                        :type="item.type=='string'?'text':'number'"
                        required
                >
                    <template v-slot:prepend-inner>
                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                    </template>

                    <template v-slot:label>
                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                        <p class="">{{ item.f_name }}</p>
                    </template>
                </v-text-field>
                <date-picker v-if="item.type=='date'" format="YYYY-MM-DD"
                             display-format="jYYYY-jMM-jDD"
                             editable
                             v-model="item.value"
                             range
                             color="rgb(var(--v-theme-info))"
                             :placeholder="item.f_name"></date-picker>
            </v-col>
            <v-divider style="border-width:1px!important;opacity: 0.2!important;" class="mx-4 mt-2"></v-divider>
            <v-col cols="12">
                <v-row class="ma-0 pa-0">
                    <v-col cols="12">
                        <p style="font-size:12px" class="font-weight-bold text-blue-darken-4">تنظیمات ترتیب نمایش</p>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-autocomplete
                                :items="filterKeys.filter((item)=>{return item.type=='number';})"
                                density="compact"
                                item-title="f_name"
                                variant="solo"
                                item-value="name"
                                v-model="sortKeyName"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                            </template>

                            <template v-slot:label>
                                <!-- <p  class="text-primary">نام لایه</p> -->
                                <p class="">فیلد انتخابی</p>
                            </template>
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-autocomplete
                                :items="['زیاد به کم','کم به زیاد']"
                                density="compact"
                                variant="solo"
                                v-model="sortValue"

                        >
                            <template v-slot:prepend-inner>
                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                            </template>

                            <template v-slot:label>
                                <!-- <p  class="text-primary">نام لایه</p> -->
                                <p class="">انتخاب ترتیب</p>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" justify="end">
            <v-btn @click="clearForms" color="error" class="font-weight-bold ml-2" style="font-size: 10px" size="small"
                   variant="tonal"
                   append-icon="mdi-sync">پاکسازی
            </v-btn>
            <v-btn @click="doFilter" color="info" class="font-weight-bold ml-2" style="font-size: 10px" size="small"
                   variant="tonal"
                   append-icon="mdi-filter">فیلتر
            </v-btn>
        </v-row>
    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";


export default defineComponent({
    name: "MyFilterComponent",

    components: {},

    props: {
        filterKeys: {
            type: Array as PropType<KeyModel[]>,
            required: true
        },
        init: {
            type: Object as PropType<DoFilterResult>,
            required: false
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const initData = ref(false)


        return {
            store,
            toast,
            router,
            route,
            initData

        }
    },

    data() {
        return {
            sortKeyName: null as string | null,
            sortValue: null as null | string,
            filterKeys_clone:[] as KeyModel[]
        }
    },

    computed: {},
    emits: ['doFilter'],
    methods: {
        doFilter() {
            const res: DoFilterResult = {
                keys: this.filterKeys_clone,
                sortKeyName: this.sortKeyName,
                sortValue: this.sortValue
            }
            this.$emit('doFilter', res)
        },
        clearForms(){
            this.filterKeys_clone = [...this.filterKeys]
            this.sortKeyName = null
            this.sortValue = null
        }
    },
    mounted() {
        this.filterKeys_clone = [...this.filterKeys]

        if (this.init){
            this.filterKeys_clone = [...this.init.keys]
            this.sortKeyName = this.init.sortKeyName
            this.sortValue = this.init.sortValue
        }
    }

});
</script>


<style>


</style>
