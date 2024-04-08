<template>
    <div style="height:100%;width:100%" class="pa-2 add_print_class">
        <Fieldset legend="ایجاد قالب">
            <p class="pb-2 font-weight-bold">
                برای ایجاد قالب جدید ابتدا نوع قالب را انتخاب کنید و بعد از آن اقدام به طراحی قالب مورد نظر بفرمایید
            </p>
        </Fieldset>

        <div style="height:70%;width:100%;display: flex;flex-direction: row;flex-wrap: wrap;align-content: flex-start;justify-content: flex-start;"
             class="pa-1 mt-8 pt-4 bg-white rounded-lg elevation-2">
            <v-btn v-for="i in items" @click="setModelVariable(i.value)"
                 style="background-color:#9dcaf2;width:100px;height:80px;display: flex;align-content: center;justify-content: center;flex-direction: column;flex-wrap: wrap;"
                 class="font-weight-bold ma-1 mx-2 rounded-lg elevation-3">
                {{ i.name }}
            </v-btn>
        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Fieldset from "primevue/fieldset";
import {useRouter} from "vue-router";


export default defineComponent({
    name: "LayerComponent",
    components: {Fieldset},
    setup() {
        const store = useStore()
        const router = useRouter()

        const initData = ref(false)
        onMounted(() => {
            setTimeout(() => {
                initData.value = true
            }, 1000)
        })

        return {
            store, initData,router
        }
    },
    data() {
        return {
            items: [
                {name: 'مدل ممیزی', value: 'SURVEY'},
                {name: 'مدل عارضه', value: 'FEATURE'},
                {name: 'مدل نقشه', value: 'MAP'}
            ]
        };
    },
    props: {},
    methods: {
        setModelVariable(value:string){
            if (value=='SURVEY'){
                this.router.push({name:'makeModel',params:{model:value}})
            }else if (value=='MAP'){
                this.router.push({name:'preMapModel'})
            }else {
                this.$toast.add({group: 'br', life: 4000, severity: 'warn', summary: ' اخطار', detail: 'در حال توسعه'});
            }

        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.add_print_class .p-fieldset .p-fieldset-legend {

    background: #e4f2fd !important;

}
</style>
