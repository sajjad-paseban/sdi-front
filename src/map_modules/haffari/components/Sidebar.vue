<template>
    <div dir="rtl" class="font-weight-bold pa-2 bg-haffari_side_back rounded-lg" style="z-index: 1000;height: 100%">
        <v-list-item

            class="mr-n4 "
            two-line
            style="font-weight: bold!important;width: max-content!important;"
            :prepend-avatar="store.getters.getUser.image?store.state.backendUrl+store.getters.getUser.image:store.state.frontUrl+'/icons/person.png'"
            :title="store.getters.getUser.first_name + ' ' + store.getters.getUser.last_name"
            :subtitle="'نام ممیزکار : '+store.getters.getUser.user_name"
        >
            <template v-slot:subtitle>
                <p style="width:max-content;font-size:11px;white-space: nowrap;overflow: hidden;" class="">
                    {{ 'نام کاربر: ' + store.getters.getUser.user_name }}</p>
            </template>
        </v-list-item>


        <v-list height="calc(100% - 90px)" style="overflow-y: auto;background-color: white!important"
                class="rounded-lg elevation-3 border" density="compact" nav
                :selected="sideModelValue">
            <v-list-item @click="router.push({name:'haffariDrawSetting'});sideModelValue=[]" color="haffari_primary" density="compact" class="text-black" prepend-icon="mdi-draw"
                         value="draw">
                <template v-slot:title>
                    <p class="text-black font-weight-bold">ترسیم حفاری</p>
                </template>
            </v-list-item>


        </v-list>
        <div style="height: 40px;width: 100%;">
            <v-row class="ma-0 pa-0 " style="height: 100%" justify="space-between" align="center">

                <v-btn
                    style="height: 30px;width: 98%;font-size: 12px"
                    prepend-icon="mdi-logout"
                    color="haffari_primary"
                    class="font-weight-bold"
                    @click="closeWindow"
                >
                    صفحه اصلی
                </v-btn>


            </v-row>

        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, onUpdated} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import router from "@/router";
import {useRoute, useRouter} from "vue-router";

import {Arse} from "@/models/Survey.interface";
import {MainDialog} from "@/store/survey/types";



export default defineComponent({
    name: "HSidebarComponent",


    components: {},

    props: {
        activeItem: {
            type: String,
            default: ''
        }


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const sideModelValue = ref<string[]>([])


        return {
            store, toast, router, sideModelValue
        }
    },

    data() {
        return {}
    },
    methods: {
        router() {
            return router
        },

        closeWindow() {

            this.store.commit('setConfirmDialog', {
                massage: 'آیا صفحه بسته شود ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    window.close()
                },
                reject: () => {
                    console.log('reject')
                },

            })

        },

    },

    watch: {

        activeItem() {
            this.sideModelValue = [this.activeItem]
        }
    },

    mounted(): void {
        this.sideModelValue = [this.activeItem]
    }

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
