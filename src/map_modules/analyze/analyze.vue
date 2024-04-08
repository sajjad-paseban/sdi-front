<template>
    <st :header="'آنالیز'" :full="false">
        <div class="rounded-lg" dir="rtl" style="height: 100%;background-color: #f3f3f3;">
            <v-layout style="height: 100%">

                <v-main style="height: 100%;width:100%">
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

            };
        },
        props: {},
        methods: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
