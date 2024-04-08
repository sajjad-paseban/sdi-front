<template>
    <div dir="rtl" class="font-weight-bold pa-2 bg-blue-lighten-4 rounded-lg" style="z-index: 1000;height: 100%">
        <v-list-item

                class="mr-n4 "
                two-line
                style="font-weight: bold!important;width: max-content!important;"
                :prepend-avatar="store.getters.getUser.image?store.state.backendUrl+store.getters.getUser.image:store.state.frontUrl+'/icons/person.png'"
                :title="store.getters.getUser.first_name + ' ' + store.getters.getUser.last_name"
                :subtitle="'نام ممیزکار : '+store.getters.getUser.user_name"
        >
            <template v-slot:subtitle>
                <p style="width:max-content;font-size:11px;white-space: nowrap;overflow: hidden;" class="">{{'نام ممیزکار: '+store.getters.getUser.user_name}}</p>
            </template>
        </v-list-item>


        <v-list height="calc(100% - 90px)" style="overflow-y: auto;background-color: white!important"
                class="rounded-lg elevation-3 border" density="compact" nav @click:select="setSideValue"
                :selected="sideModelValue">
            <v-list-item density="compact" prepend-icon="mdi-map-legend" title="عرصه"
                         value="Arse"></v-list-item>
            <v-list-item prepend-icon="mdi-office-building" title="ساختمان" value="building"></v-list-item>
            <v-list-item prepend-icon="mdi-stairs-up" title="طبقه" value="floor"></v-list-item>
            <v-list-item prepend-icon="mdi-home-city" title="واحد های مستقل" value="apartemanList"></v-list-item>
            <v-list-item prepend-icon="mdi-briefcase" title="واحد های شغلی" value="jobList"></v-list-item>
            <v-list-item prepend-icon="mdi-folder-image" title="آرشیو" value="archiveList"></v-list-item>
            <v-list-item prepend-icon="mdi-video-3d" title="نمایش 3D" value="3D"></v-list-item>
            <v-list-item prepend-icon="mdi-panorama" title="پانوراما" value="پانوراما"></v-list-item>

        </v-list>
        <div style="height: 40px;width: 100%;">
            <v-row class="ma-0 pa-0 " style="height: 100%" justify="space-between" align="end">

                <v-btn
                        style="height: 30px;width: 45%;font-size: 12px"
                        prepend-icon="mdi-logout"
                        color="blue-darken-2"

                        @click="closeWindow"
                        >
                    صفحه اصلی
                </v-btn>

                <v-btn
                        v-if="panelUser"
                        :disabled="panelUser.user_type !== PanelUserType.Manager"
                        style="height: 30px;width: 45%;font-size: 12px"
                        prepend-icon="mdi-logout"
                        color="blue-darken-2"
                        @click="selectMelk"
                >
                    انتخاب ملک
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
import {SurveyMutations} from "@/store/survey/mutations";
import {Arse} from "@/models/Survey.interface";
import {MainDialog} from "@/store/survey/types";
import {PanelUserType} from "@/models/SurveyPanel.interface";


export default defineComponent({
    name: "SidebarComponent",
    computed: {
        PanelUserType() {
            return PanelUserType
        }
    },

    components: {},

    props: {
        activeItem: {
            type: String,
            default: 'Arse'
        }


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const sideModelValue = ref<string[]>([])

        const panelUser = computed(() => {
            return store.getters.getPanelUser
        });

        watch(() => route.name, (value) => {
            const name:any = route.name
            if (name.toLowerCase().includes("arse")){
                sideModelValue.value = ['Arse']
            }
            if (name.toLowerCase().includes("building")){
                sideModelValue.value = ['building']
            }
            if (name.toLowerCase().includes("floor")){
                sideModelValue.value = ['floor']
            }
            if (name.toLowerCase().includes("aparteman")){
                sideModelValue.value = ['apartemanList']
            }
            if (name.toLowerCase().includes("job")){
                sideModelValue.value = ['jobList']
            }
        })


        return {
            store, toast, router,sideModelValue,panelUser
        }
    },

    data() {
        return {

        }
    },
    methods: {
        router() {
            return router
        },
        async setSideValue(data: { id: string }) {
            this.sideModelValue = [data.id]

            if (data.id == '3D'||data.id=='پانوراما'){
                await this.store.commit(SurveyMutations.SET_MAIN_DIALOG, {
                    title:data.id,
                    show:true,
                    component:data.id
                })
            }else {
                const arse: Arse = this.store.getters.getArseInfo
                if (data.id === 'archiveList' && arse.id) {
                    await this.store.commit(SurveyMutations.SET_MAP_DISABLE, true)
                    console.log(this.store.getters.getMapDisable)
                    await this.store.commit(SurveyMutations.SET_ARCHIVE_DATA, {arse_id: arse.id,building_id:null,apartment_id:null,business_unit_id:null,business_id:null})
                }
                this.$router.push({
                    name: data.id
                })
            }


        },
        closeWindow(){

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
        async selectMelk() {
            await this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
            setTimeout(() => {
                router.push({name: 'selectMap'})
            }, 100)

        }
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
