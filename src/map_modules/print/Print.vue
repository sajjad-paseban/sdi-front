<template>
    <!-- <st :header="'قالب چاپی'" @navClick="navToggle" :full="true"> -->
        <div class="print_template" dir="rtl" style="height: 100%;background-color: rgba(171,171,171,0.32);">
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
                                :base-color="item.value === currentRoute?'info':''" :active="item.value === currentRoute"
                        >
                            <template v-slot:prepend>

                                    <v-img  height="25"
                                            width="25"
                                            class="ml-2"
                                            :src="store.state.frontUrl + item.icon"
                                            alt="John"
                                    ></v-img>

                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>

                        <v-list-item
                                v-if="currentRoute==='editModel'"
                                :key="editItem.text"
                                :value="editItem"
                                :base-color="editItem.value === currentRoute?'info':''" :active="editItem.value === currentRoute"
                        >
                            <template v-slot:prepend>

                                <v-img  height="25"
                                        width="25"
                                        class="ml-2"
                                        :src="store.state.frontUrl + editItem.icon"
                                        alt="John"
                                ></v-img>

                            </template>

                            <v-list-item-title v-text="editItem.text"></v-list-item-title>
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
                                :base-color="item.value === currentRoute?'info':''" :active="item.value === currentRoute"
                        >
                            <template v-slot:prepend>

                                    <v-img
                                            height="25"
                                            width="25"
                                            class="ml-2"
                                            :src="store.state.frontUrl + item.icon"
                                            alt="John"
                                    ></v-img>

                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                v-if="currentRoute==='editModel'"
                                :key="editItem.text"
                                :value="editItem"
                                :base-color="editItem.value === currentRoute?'info':''" :active="editItem.value === currentRoute"
                        >
                            <template v-slot:prepend>

                                <v-img  height="25"
                                        width="25"
                                        class="ml-2"
                                        :src="store.state.frontUrl + editItem.icon"
                                        alt="John"
                                ></v-img>

                            </template>

                            <v-list-item-title v-text="editItem.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <v-main style="height: 100%;width:100%">

                  <router-view/>
                </v-main>
            </v-layout>
        </div>
    <!-- </st> -->
</template>

<script lang="ts">
import {defineComponent} from "vue";

import St from "@/components/common/startComponent.vue";
import {useStore} from "vuex";


export default defineComponent({
    name: "PrintComponent",
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
                {text: "لیست قالب ها", icon: "/icons/dashboard.png", value: 'printList'},
                {text: "اضافه کردن قالب", icon: "/icons/addSurvey.png", value: 'addPrint'},
                {text: "گروه بندی قالب ها", icon: "/icons/tree.png", value: 'groupModelList'},
            ],

            editItem :  {text: "ویرایش قالب", icon: "/icons/edit.png", value: 'editModel'},

            selected: "لیست قالب ها",
            navMenu: false,

            currentRoute :'printList' as string|undefined
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

    watch: {
        $route(to, from) {
            this.currentRoute = to.path.split("/")[2]
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .print_template{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
