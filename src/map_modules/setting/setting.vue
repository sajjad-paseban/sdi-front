<template>
    <st :header="'تنظیمات'">
        <div dir="ltr" style="height: 100%">
            <Splitter style="height: 100%" class="ma-0 pa-0 rounded-lg">
                <SplitterPanel class="" :size="85" style="overflow-y: auto !important">
                    <template v-if="$route.matched.length === 2">
                        <v-row style="height: 100%;width: 100%" class="pa-0 ma-0" justify="center" align="center">
                            <v-fade-transition>
                                <div v-if="showGif" style="height: 200px;width: 200px;">

                                    <v-img
                                            src="@/assets/gifs/setting_anime.gif"
                                            height="100%"
                                            width="100%"
                                            cover

                                    ></v-img>
                                </div>
                            </v-fade-transition>
                        </v-row>
                    </template>
                    <router-view></router-view>
                </SplitterPanel>

                <SplitterPanel
                        dir="rtl"
                        class="rounded-lg"
                        style="overflow-y: auto !important; min-width: 55px !important"
                        :size="20"
                >
                    <v-list
                            class="MyLayer"
                            :lines="false"
                            density="compact"
                            nav
                            @click:select="selectNav"
                            style=""
                    >
                        <v-list-item
                                v-for="item in items"
                                :key="item.text"
                                :value="item"
                                :base-color="item.text === selected?'primary':''" :active="item.text === selected"
                        >
                            <template v-slot:prepend>
                                <v-avatar size="25" class="">
                                    <v-img
                                            class=""
                                            :src="store.state.frontUrl +item.icon"
                                            alt="John"
                                    ></v-img>
                                </v-avatar>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </SplitterPanel>
            </Splitter>
        </div>
    </st>
</template>

<script lang="ts">
    import {defineComponent} from "vue";

    import St from "@/components/common/startComponent.vue";

    import Splitter from "primevue/splitter";
    import SplitterPanel from "primevue/splitterpanel";
    import {useStore} from "vuex";


    export default defineComponent({
        name: "settingComponent",
        components: {St, Splitter, SplitterPanel},
        setup(){
            const store = useStore()
            return{
                store
            }
        },
        data() {
            return {
                showGif:false,
                items: [
                    {text: "مدیریت چارت", icon: "/icons/role.png", value: "manageRolesList", name: 'manageRoles'},
                    {
                        text: "مدیریت کاربران",
                        icon: "/icons/users.png",
                        value: "mangeUsersList",
                        name: 'manageUsers'
                    },
                    {text: "مدیریت لاگها", icon: "/icons/log.png", value: "manageLogsList", name: 'manageLogs'},
                    {text: "مدیریت IP مسدود شده", icon: "/icons/private_ip.png", value: 'manageIPsList', name: 'manageIPs'},
                    {
                        text: "مدیریت کاربران لاگین شده",
                        icon: "/icons/users_login.png",
                        value: 'manageLoginedUsersList',
                        name: 'manageLoginedUsers'
                    },
                    {
                        text: "مدیریت توافق نامه",
                        icon: "/icons/licence.png",
                        value: 'manageContractForm',
                        name: 'manageContractForm'
                    },
                    {text: "مدیریت اتصال", icon: "/icons/connect.png", value: 'manageDataBases', name: 'manageConnections'},
                    {text: "مدیریت تسک های پس زمینه", icon: "/icons/back_task.png", value: 'backup', name: 'backgroundTasks'},
                    {
                        text: "مدیریت نقشه های زیرین",
                        icon: "/icons/baseMap.png",
                        value: 'manageBaseMapList',
                        name: 'manageBaseMaps'
                    },
                    {text: "مدیریت API KEY ", icon: "/icons/api_key.png", value: 'manageKEYsList', name: 'manageKEYs'},
                    {
                        text: "مدیریت کروکی ساز ها",
                        icon: "/icons/koroki.png",
                        value: 'manageModelsList',
                        name: 'manageKorokiModels'
                    },
                    {text: "لیست جدول های دیتابیس", icon: "/icons/database.png", value: 'manageTablesList', name: 'manageTables'},
                    {text: "مدیریت دسترسی ها", icon: "/icons/Lock.png", value: 'manageAccessList', name: 'manageAccess'},
                ],

                selected: "",
            };
        },
        props: {},

        watch: {
            $route(to) {
                let text = ''
                const item = this.items.filter((item) => {
                    if (to.matched.length > 3) {
                        if (item.name === to.matched[2].name) {
                            return true
                        }
                    } else {
                        return false
                    }

                })
                if (item.length > 0) {
                    text = item[0].text
                }
                this.selected = text
            }
        },
        methods: {
            selectNav(item: any) {
                // this.selected = item.id.text;
                if (item.value) {
                    this.$router.push({name: item.id.value});
                }
            },
        },

        mounted() {
            setTimeout(()=>{
                this.showGif = true
            },500)
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .MyLayer .v-list-item__prepend > .v-icon {
        margin-inline-end: 15px !important;
    }
</style>
