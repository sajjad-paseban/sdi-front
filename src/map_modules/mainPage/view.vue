<template>
    <div :style="fullScreen?'width: 100%;height: 100%;overflow-x: hidden;overflow-y: hidden;position: relative':''">
        <router-view></router-view>
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
