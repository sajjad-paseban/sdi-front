<template>

    <!--        <Sidebar-->
    <!--                v-model:visible="visible"-->
    <!--                :baseZIndex="999"-->
    <!--                position="bottom"-->
    <!--                :class="{ fullWindowStart: fullWindow }"-->
    <!--                :showCloseIcon="false"-->
    <!--                style="background-color: rgb(var(&#45;&#45;v-theme-dialogBar))"-->
    <!--                :dismissable="false"-->
    <!--                class="rounded-lg"-->
    <!--        >-->
    <div style="height: 100dvh;width:100dvw;position: fixed;right: 0;top:0;z-index: 1000">
        <v-navigation-drawer
                style="bottom: 50px;left:10dvw !important;width: 80dvw;height:calc(100dvh - 120px);border-radius: 0.375rem;"
                v-model="visible"
                location="bottom"
                class="elevation-3 border"
                :style="fullWindow?';z-index: 100000;top: 30px !important; left: 10px !important;width: calc(100dvw - 20px) !important;height: calc(100dvh - 80px) !important':''"
                touchless
                temporary
                permanent
        >
            <div dir="ltr" class="" style="overflow-y: hidden;height: 100%;">
                <div class="startBar">
                    <v-btn
                            v-if="closeBtn"
                            style="z-index: 1001 !important; margin-top: -8px"
                            class="ml-1"
                            width="20px"
                            height="20px"
                            position="fixed"
                            color="white"
                            size="small"
                            variant="text"
                            @click="closeSt"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn
                    >
                    <v-btn
                            v-if="closeBtn"
                            style="z-index: 1001 !important; margin-top: -8px"
                            class="ml-8"
                            width="20px"
                            height="20px"
                            left=""
                            position="fixed"
                            color="white"
                            size="small"
                            variant="text"
                            @click="maximizeStart"
                    >
                        <v-icon v-if="fullWindow">mdi-window-minimize</v-icon>
                        <v-icon v-else>mdi-window-maximize</v-icon>
                    </v-btn>
                </div>


                <div dir="rtl">
                    <v-slide-y-transition>
                        <v-btn
                                v-if="bar"
                                style="
                z-index: 1000 !important;
                font-size: 12px;
                height: 20px;
                width: 80dvw;
                color: white;
                margin-top: -8px;
              "
                                :class="{ fullbar: fullWindow }"
                                class="rounded-t-lg"
                                flat
                                color="dialogBar"
                                position="fixed"
                                size="x-small"
                        >{{header}}
                        </v-btn
                        >
                    </v-slide-y-transition>
                </div>

                <div dir="rtl">
                    <v-slide-y-transition>
                        <v-btn
                                v-if="bar"
                                style="
                z-index: 1001 !important;
                font-size: 12px;
                height: 20px;
                width: 20px;
                color: white;
                margin-top: -8px;
              "

                                class="rounded-t-lg nav_menu"
                                flat
                                color="dialogBar"
                                position="fixed"
                                size="x-small"
                                @click="navClick"
                        >
                            <v-icon>mdi mdi-menu</v-icon>
                        </v-btn>
                    </v-slide-y-transition>
                </div>


                <div class="rounded-lg " dir="rtl" style="padding-top: 8px;padding-left:1px;height: 100%;">
                    <slot></slot>
                </div>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import Sidebar from "primevue/sidebar";

    export default defineComponent({
        name: "startComponent",
        components: {},
        props: {
            header: {
                type: String,
                required: true
            },
            full: {
                type: Boolean,
                default: false
            },
            closeFun:{
                type:Function,
                required:false
            }
        },

        data() {
            return {
                visible: true,
                bar: false,
                closeBtn: false,

                fullWindow: false,
            };
        },
        methods: {
            closeSt: function () {
                this.visible = false;
                setTimeout(() => {
                    if (this.closeFun){
                        this.closeFun()
                    }else {
                        this.$router.push({name: "home"});
                    }
                }, 400);
            },
            maximizeStart() {
                this.fullWindow = !this.fullWindow;
            },
            navClick() {
                this.$emit('navClick', true)
            },
        },
        watch: {
            full(){
                this.fullWindow = this.full
            }
        },
        mounted() {
            this.fullWindow = this.full
            setTimeout(() => {
                this.bar = true;
            }, 400);
            setTimeout(() => {
                this.closeBtn = true;
            }, 1200);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .sideBottom {
        bottom: 50px;
        left: 10dvw !important;
        width: 80dvw;
        height: calc(100dvh - 120px);
        border-radius: 0.375rem;
    }

    /*
        .p-sidebar-mask {
          z-index: 1000;
        }

        .p-component-overlay {
          background-color: rgba(0, 0, 0, 0) !important;
        }

        .p-sidebar-bottom .p-sidebar-header {
          padding: 0px !important;
        }

        .p-sidebar-bottom .p-sidebar-content {
          padding: 0pc !important;
        } */


</style>
