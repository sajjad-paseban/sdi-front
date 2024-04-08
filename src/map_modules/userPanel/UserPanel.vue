<template>
    <st :header="'پنل کاربری'" :full="true" @navClick="navToggle" >
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
                                <v-img  width="25"
                                        class="ml-3"
                                        :src="store.state.frontUrl + item.icon"
                                        alt="John"
                                ></v-img>
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
                                <v-img  width="25"
                                        class="ml-3"
                                        :src="store.state.frontUrl + item.icon"
                                        alt="John"
                                ></v-img>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-navigation-drawer>

                <v-main style="height: 100%">
                    <template v-if="$route.matched.length === 2">
                        <v-row style="height: 100%;width: 100%;" class="pa-0 ma-0 bg-white" justify="center" align="center">
                            <v-fade-transition>
                                <div class="pa-2" style="width: 50%;height: 50%">

                                    <v-img
                                            src="@/assets/gifs/dashboard.gif"
                                            height="100%"
                                            width="100%"


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
        name: "AnalyzeComponent",
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
                    {text: "کارتابل", icon: "/icons/cartable.png", value: 'carTable'},


                ],

                selected: "",
                navMenu:false
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
            navToggle(){
                this.navMenu = !this.navMenu
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
