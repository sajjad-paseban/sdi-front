<template>
    <div style="height:100%;width:100%" class="pa-2 myForm">
        <v-row v-if="getTempsList" class="ma-0 pa-0 pa-1 rounded-lg "
               style="height:calc(100% - 10px);overflow-y: auto;display: flex;align-content: flex-start;">
            <div v-for="(item,index) in getTempsList" :key="index" style="height:80px;width:80px"
                 class="rounded-lg ma-1 elevation-2 bg-grey">
                <v-btn @click="selectTemp(item.temp_value)" v-tooltip.right="item.name" style="height:100%;width:100%;" color="info" class="rounded-lg font-weight-bold pa-2">
                    <p style="width:75px;font-size:10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.name}}</p>
                </v-btn>

            </div>


        </v-row>



    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {UploadTempImageInterface} from "@/api/print/SD.Models/uploadTempImage.sd";
import print_functions from "@/componentFunctions/print_functions";


export default defineComponent({
    name: "TempsSampleComponent",
    components: {},
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const {getTemps,getTempsList} = print_functions()

        const initData = ref(false)


        onMounted(async () => {
            await getTemps({model_variable: props.model_variable})
            setTimeout(() => {
                initData.value = true
            }, 1000)
        })

        return {
            store, initData, router,getTempsList
        }
    },
    data() {
        return {};
    },
    props: {
        model_variable:{
            type:String,
            required:true
        }
    },
    emits: ['selectTemp'],
    methods: {
        selectTemp(value:string){
            this.$emit('selectTemp',value)
        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.p-tooltip{
    z-index: 1000000001!important;
}
</style>
