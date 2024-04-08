<template>
    <div style="height: 100%;">
        <v-navigation-drawer
                style="background-color: #f3f3f3;width: max-content;position: absolute!important;"
                :style="fullScreen?'height:calc(100%);':'height: calc(100% - 65px);top:20px'"
                v-model="drawer"
                @update:modelValue="checkClose"
                class="rounded-lg pa-1 pt-2"
                temporary
        >
            <BaseMapMenu :full-screen="fullScreen" v-show="page === 'map'"></BaseMapMenu>

            <div style="height: 100%" v-show="page === 'layers'" class="elevation-1 rounded-lg mx-1">
                <layer-tree :full-screen="fullScreen" class=""></layer-tree>
            </div>

            <SettingMenu @closeSideBar="handleClose" v-if="page === 'setting'"></SettingMenu>
        </v-navigation-drawer>

    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import BaseMapMenu from "./BaseMapMenu.vue";
    import SettingMenu from "./settingMenu.vue";
    import layerTree from "@/components/common/layerTree.vue"

    interface Item {
        key: string;
        label: string;
        children: Item[];
    }



    export default defineComponent({
        name: "sideBar",
        components: { BaseMapMenu, SettingMenu,layerTree},
        props: {
            drawerButton: {
                type: Boolean,
            },
            page: {
                type: String,
            },
            fullScreen: {
                type: Boolean,
                default:false
            },
        },
        data() {
            return {
                drawer: false,


            };
        },
        methods: {
            handleClose: function () {
                this.$emit("closeDrawer", true);
            },
            checkClose(){
                if (!this.drawer){
                    this.$emit("closeDrawer", true);
                }
            },

        },
        watch: {
            drawerButton() {
                this.drawer = this.$props.drawerButton;
            },
        },
    });
</script>

<style>

    .v-navigation-drawer__scrim {
        right:0!important
    }
</style>
