<template>

    <st :header="'تنظیمات صفحات'" :closeFun="()=>{router.push({name:'haffari'})}">
        <div class="rounded-lg" dir="rtl" style="height: 100%;background-color: #f3f3f3;">
            <v-layout style="height: 100%">

                <v-main style="height: 100%">
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
import {useRouter} from "vue-router";


export default defineComponent({
    name: "SettingPagesComponent",
    components: {St},
    setup() {
        const store = useStore()
        const router = useRouter()
        return {
            store,router
        }
    },
    data() {
        return {


        };
    },
    props: {},
    methods: {

    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.MyLayer .v-list-item__prepend > .v-icon {
    margin-inline-end: 15px !important;
}
</style>

