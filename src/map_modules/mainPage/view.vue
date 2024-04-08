<template>
    <div :style="fullScreen?'width: 100%;height: 100%;overflow-x: hidden;overflow-y: hidden;position: relative':''">

        <Appbar v-if="!fullScreen" app @settingClick="settingMenuClick"></Appbar>
        <mouse-info :full-screen="fullScreen" v-if="map"></mouse-info>
        <div v-if="!fullScreen">
            <v-container
                    class=" pa-0 ma-0"
                    :class="fullScreen?'':'myContainerClass'"
                    fluid

            >
                <Map :full-screen="fullScreen">

                    <slot :map="map"></slot>


                    <router-view v-if="map||fullScreen" :map="map"></router-view>

                </Map>
            </v-container>
        </div>
        <template v-else>
            <Map :full-screen="fullScreen">

                <slot :map="map"></slot>


                <router-view v-if="(map||fullScreen)&&store.getters.getAllMapConfigLoad" :map="map"></router-view>

            </Map>
        </template>

        <SideBar
                v-if="map||fullScreen"
                :page="sidePage"
                :full-screen="fullScreen"
                :drawerButton="side"
                @closeDrawer="side = false"
        ></SideBar>



        <ToolMenu :page="page" :full-screen="fullScreen" @toolBtnHandle="toolHandle"/>
        <Taskbar v-if="!fullScreen" app/>
        <div v-if="page" style="position: absolute;bottom: 50px;left:8px;z-index: 101;width: 140px;height: 32.5px"
             class="bg-themeBars rounded-lg elevation-3 pt-2 text-center">
            <layer-active-name></layer-active-name>
        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent, computed, watch, ref} from "vue";
    import Appbar from "./appbar.vue";
    import Taskbar from "./taskbar.vue";
    import SideBar from "./sideBar.vue";
    import ToolMenu from "./ToolMenu.vue";
    import Map from "./map.vue";
    import {useStore} from "vuex";
    import MouseInfo from "@/map_modules/mainPage/mouseInfo.vue";
    import LayerActiveName from "@/map_modules/mainPage/layerActiveName.vue";

    // Components

    export default defineComponent({
        name: "HomeView",

        components: {Appbar, Taskbar, SideBar, ToolMenu, Map, MouseInfo, LayerActiveName},

        setup(props) {
            const store = useStore()
            const map = ref<Map|null>(null)



            watch(()=>store.getters.getSubMap,(item)=>{
                map.value =  props.fullScreen ? store.getters.getSubMap : store.getters.getMap

            })
            watch(()=>store.getters.getMap,(item)=>{
                map.value =  props.fullScreen ? store.getters.getSubMap : store.getters.getMap
            })
            return {
                store, map
            }
        },

        data() {
            return {
                //----for sideBar---//
                side: false,
                sidePage: "",
                //----for sideBar---//

            };
        },

        methods: {
            settingMenuClick: function () {
                this.side = !this.side;
                this.sidePage = "setting";
            },

            toolHandle: function (name: string) {
                if (name == "layers") {
                    this.side = !this.side;
                    this.sidePage = "layers";

                } else {
                    this.side = !this.side;
                    this.sidePage = "map";

                }
                console.log(name);
            },
        },

        props: {
            fullScreen: {
                type: Boolean,
                default: false
            },
            page: {
                type: Boolean,
                default: false
            }
        },
        mounted(): void {
            console.log(this.fullScreen, 'fullScreen')
        }

    });
</script>

<style>
    .myContainerClass {
        position: absolute;
        top: 16px;
        bottom: 38px;
    }
</style>
