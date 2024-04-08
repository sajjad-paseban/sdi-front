<template>
    <div style="height: calc(100% - 30px);width: max-content;min-width: 100%;background-color:white;overflow-y: auto;overflow-x: hidden"
         class="elevation-1 rounded-lg py-3 px-1  elevation-3">

        <v-row class="pa-0 ma-0" :style="mdAndUp?'width:20dvw':'width:50dvw'">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <template v-if="initData && fullScreen&& store.getters.getSubActiveBaseMap">
                <v-col v-for="item in baseMaps" :key="item.id" class="d-flex child-flex" cols="12" sm="6">
                    <!-- <v-img aspect-ratio="1" cover class="bg-grey-lighten-2"> </v-img> -->

                    <v-card width="100%" :color="item.id === store.getters.getSubActiveBaseMap.id?'grey':''"
                            class="rounded-lg border elevation-3 pa-1">
                        <v-img
                                :src="store.state.backendUrl+item.image"
                                @click="changeBaseMap(item)"
                                cover

                                class="bg-grey-lighten-2 rounded-lg" style="cursor: pointer;width:100%"
                        >
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular
                                            indeterminate
                                            color="grey-lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                            <v-row style="background-color: #00000052;color: white;" class="pa-0 ma-0" justify="center">

                                <p class="text-caption mt-1 baseMapText">
                                    {{ item.name }}
                                </p>
                            </v-row>
                        </v-img>
                    </v-card>
                </v-col>
            </template>
            <template v-if="initData &&!fullScreen&&store.getters.getActiveBaseMap">
                <v-col v-for="item in baseMaps" :key="item.id" class="d-flex child-flex" cols="12" sm="6">
                    <!-- <v-img aspect-ratio="1" cover class="bg-grey-lighten-2"> </v-img> -->

                    <v-card width="100%" :color="item.id === store.getters.getActiveBaseMap.id?'grey':''"
                            class="rounded-lg border elevation-3 pa-1">
                        <v-img
                                :src="store.state.backendUrl+item.image"
                                @click="changeBaseMap(item)"
                                max-height="125"
                                cover
                                class="bg-grey-lighten-2 rounded-lg" style="cursor: pointer"
                        >
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular
                                            indeterminate
                                            color="grey-lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                            <v-row style="background-color: #00000052;color: white;" class="pa-0 ma-0" justify="center">

                                <p class="text-caption mt-1 baseMapText">
                                    {{ item.name }}
                                </p>
                            </v-row>
                        </v-img>
                    </v-card>
                </v-col>
            </template>

        </v-row>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import Tooltip from 'primevue/tooltip';
import baseMap from "@/componentFunctions/baseMap_functions";
import {useStore} from "vuex";
import {BaseMapInterface} from "@/models/BaseMap.interface";
import {OpenLayerAction} from "@/store/openLayer/actions";
import {useDisplay} from "vuetify";
import {UserStates} from "@/store/user/types";

export default defineComponent({
    name: "BaseMapMenu",
    components: {},


    setup() {
        const {baseMaps, getBaseMaps} = baseMap()
        const initData = ref(false)
        const store = useStore()
        const {mdAndUp} = useDisplay()

        onMounted(async () => {
            const BASE = localStorage.getItem('BASE_MAPS')
            if (typeof BASE === 'string') {
                baseMaps.value = JSON.parse(BASE)
            }else {
                await getBaseMaps()
            }

            setTimeout(() => {
                initData.value = true
            }, 200)
        })

        return {
            baseMaps, getBaseMaps, initData, store, mdAndUp
        }
    },

    data() {
        return {
            online: true,
        };
    },

    directives: {
        'tooltip': Tooltip
    },

    props: {
        fullScreen: {
            type: Boolean,
            default: false
        },
    },

    methods: {
        changeBaseMap: function (item: BaseMapInterface) {
            if (this.fullScreen) {
                this.store.dispatch(OpenLayerAction.SET_SUB_BASE_MAP, item)
            } else {
                this.store.dispatch(OpenLayerAction.SET_BASE_MAP, item)
            }

        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.baseMapText {
    font-size: 10px !important;
    font-family: "IRANSansWeb_UltraLight" !important;
    font-weight: bold;
}
</style>
