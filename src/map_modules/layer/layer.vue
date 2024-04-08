<template>
    <st :header="'لایه'" @navClick="navToggle">
        <div class="rounded-lg" dir="rtl" style="height: 100%;background-color: #f3f3f3;">
            <v-layout style="height: 100%">
                <v-navigation-drawer
                        class="desk_nav rounded-lg"
                        expand-on-hover
                        style="display: none;z-index: 10000001"

                        rail
                >
                    <v-list class="" :lines="false" density="compact" nav @click:select="selectNav" style="">

                        <v-list-item
                                v-for="(item) in items"
                                :key="item.text"
                                :value="item"
                                :base-color="item.text === selected?'primary':''" :active="item.text === selected"
                        >
                            <template v-slot:prepend>
                                <v-avatar size="25" class="">
                                    <v-img
                                            class=""
                                            :src="store.state.frontUrl + item.icon"
                                            alt="John"
                                    ></v-img>
                                </v-avatar>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-navigation-drawer>

                <v-navigation-drawer
                        class="mobile_nav"
                        style="display: none"
                        v-model="navMenu"
                        rounded
                        temporary
                >
                    <v-list class="" :lines="false" density="compact" nav @click:select="selectNav" style="">

                        <v-list-item
                                v-for="(item) in items"
                                :key="item.text"
                                :value="item"
                                :base-color="item.text === selected?'primary':''" :active="item.text === selected"
                        >
                            <template v-slot:prepend>
                                <v-avatar size="25" class="">
                                    <v-img
                                            class=""
                                            :src="store.state.frontUrl + item.icon"
                                            alt="John"
                                    ></v-img>
                                </v-avatar>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-navigation-drawer>
                <v-main style="height: 100%">
                    <template v-if="$route.matched.length === 2">
                        <v-row style="height: 100%;width: 100%;background-color: #f8f8f8" class="pa-0 ma-0"
                               justify="center" align="center">
                            <v-fade-transition>
                                <div style="height: 400px;width: 400px;">

                                    <v-img
                                            src="@/assets/gifs/layer.gif"
                                            height="100%"
                                            width="100%"
                                            cover

                                    ></v-img>
                                </div>
                            </v-fade-transition>
                        </v-row>
                    </template>
                    <router-view></router-view>
                </v-main>
            </v-layout>
        </div>
    </st>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import St from "@/components/common/startComponent.vue";
import {useStore} from "vuex";


export default defineComponent({
    name: "LayerComponent",
    components: {St},
    setup() {
        const store = useStore()
        return {
            store
        }
    },
    data() {
        return {
            items: [
                {text: "اضافه کردن لایه", icon: "/icons/add.png", value: 'addLayer'},
                {text: "ویرایش لایه", icon: "/icons/edit.png", value: 'editLayer'},
                {text: "حدف لایه", icon: "/icons/delete.png", value: 'deleteLayer'},
                {text: "گروه لایه", icon: "/icons/tree.png", value: 'groupLayerList'},
                {text: "کاتالوگ لایه", icon: "/icons/style.png", value: 'modelStyles'},
                // {text: "لیست لایه", icon: "list"},
                // {text: "ارزیابی توپولوژی", icon: "progress"},
                {text: "مشخصات لایه", icon: "/icons/info.png", value: 'layerInfo'},
                // {text: "کنترل نسخه", icon: "history"},
                {text: "خروجی از لایه", icon: "/icons/export.png", value: 'layerExport'},
                {text: "تبدیل لایه", icon: "/icons/layer_convert.png", value: 'layerConvert'},
                {text: "ایجاد وب سرویس از لایه", icon: "/icons/service.png"},
                {text: "ابزار های لایه", icon: "/icons/tools.png", value: 'layerTools'},


            ],

            selected: "",
            navMenu: false

        };
    },
    props: {},
    methods: {
        selectNav(item: any) {

            this.selected = item.id.text
            if (item.value) {

                this.$router.push({name: item.id.value})
            }

        },
        navToggle() {
            this.navMenu = !this.navMenu
        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.MyLayer .v-list-item__prepend > .v-icon {
    margin-inline-end: 15px !important;
}
</style>
