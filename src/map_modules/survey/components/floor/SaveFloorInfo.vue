<template>
    <div style="height:100%;width:100%" class="pa-2">
        <v-row class="pa-0 ma-0" style="height:100%" justify="center" align="center">
            <v-col cols="12" sm="10" id="table" style="height:70%" class="rounded-lg elevation-3 pa-0 bg-white">
                <v-row class="ma-0 pa-2" style="height:100%" align="center" justify="center">

                    <p class="font-weight-bold " style="font-size: 13px;line-height: 30px;">اگر از صحت اطلاعات طبقه مطمئن هستید ، برای ثبت طبقه بعدی روی دکمه <span class="text-blue"> لیست طبقات </span>کلیک کنید .</p>

                </v-row>

            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, watch, ref, computed} from "vue";

    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as map} from "ol/Map";



    export default defineComponent({
        name: "SaveFloorInfoComponent",

        components:{

        },

        props: {



        },

        setup(props){
            const store = useStore();
            const toast = useToast()



            return{
                store,toast
            }
        },

        data(){
            return{

            }
        },
        methods:{

        },

        watch:{

        },



    });
</script>


<style>

    .p-splitter .p-splitter-gutter .p-splitter-gutter-handle {
        background: #0461be !important;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    }

    .p-splitter .p-splitter-gutter {
        transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
        background: #adadad !important;
    }
</style>
