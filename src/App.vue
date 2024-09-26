<template>
    <v-app>
        <Toast dir="rtl" position="bottom-right" group="br"/>
        <Toast dir="rtl" position="top-right" group="tr"/>
        <v-overlay style="z-index: 1000000004!important;" persistent contained
                   v-model="store.state.requestLoading.simple">
            <v-row class="pa-0 ma-0 " align="center" style="height: 100dvh;width: 100dvw;" justify="center">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-row>
        </v-overlay>
        <confirm-dialog-component :accept="store.state.confirmDialog.accept"
                                  :active="active"
                                  :reject="store.state.confirmDialog.reject"
                                  :massage="store.state.confirmDialog.massage"
                                  :topic="store.state.confirmDialog.topic"
                                  :no-btn="store.state.confirmDialog.noBtn"
                                  :yes-btn="store.state.confirmDialog.yesBtn"
        ></confirm-dialog-component>
        <router-view/>
    </v-app>

</template>

<script lang="ts">
    import {defineComponent, ref, onMounted} from "vue";
    import Toast from 'primevue/toast';
    import ConfirmDialogComponent from "@/components/common/confirmDialog.vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import * as process from 'process';
    import {setBaseUrl} from "@/api/config";

    export default defineComponent({
        name: "App",
        setup() {
            const store = useStore()
            const show = ref(true)
            const router = useRouter()
            const toast = useToast()

            return {
                store, show
            }
        },
        data() {
            return {
                active: false

            };
        },
        beforeMount(){
            this.$router.push({name: 'print'})
        },
        async mounted(): Promise<void> {
            await this.initEnv()
            await this.init_api_base_url()
        },
        components: {ConfirmDialogComponent, Toast},
        watch: {
            'store.state.confirmDialog': function (data: {
                massage: string | null,
                topic: string | null,
                accept: () => void,
                reject: () => void,
                active: boolean
            }) {
                this.active = data.active

            }

        },
        methods: {
            async initEnv() {
                const env = import.meta.env
                await this.store.commit('set_links_init', {
                    frontUrl: env.VITE_FRONT_URL,
                    geoUrl: env.VITE_GEO_URL,
                    backendUrl: env.VITE_BACK_URL,
                    layerExportLink: env.VITE_LAYER_EXPORT_LINK
                })

            },
            init_api_base_url(){
                setBaseUrl(this.store.state.backendUrl)
            }
        },

    });
</script>
<style>
    @import url('@/assets/main_style.css');
</style>

