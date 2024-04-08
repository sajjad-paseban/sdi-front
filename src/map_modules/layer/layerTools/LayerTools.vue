<template>
    <v-slide-y-transition>
        <div v-if="show" class="py-1" style="height: 100%">

            <v-row class="ma-0 pa-0 ma-4"  style="height: 100%;display: flex;align-content: flex-start;}">


                    <v-card
                            @click="menuHandler('mergeLayers')"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-3 bg-white ma-2 pa-2 rounded-lg"
                            height="120"
                            width="120"
                    >
                        <v-img src="@/assets/icons/merge.png" height="60px"></v-img>
                        <v-row class="ma-0 pa-0" style="height:50px" align="center" justify="center">
                            <p class="font-weight-bold" style="font-size: 12px">ترکیب لایه</p>
                        </v-row>
                    </v-card>
            </v-row>

        </div>
    </v-slide-y-transition>

    <div v-if="selectedMenu" style="height: 100%;width:100%">
        <router-view></router-view>
    </div>


</template>

<script lang="ts">
import {defineComponent, h} from "vue";



export default defineComponent({
    name: "layerStyleConfig",
    components: { },
    data() {
        return {
            show: false,

            selectedMenu:false,

            iconBack : '#ffffff00',

        };
    },
    props: {
        msg: String,
    },
    methods: {
        h,
        menuHandler: function (value: string) {
            setTimeout(() => {
                this.show = false;
            }, 100);

            setTimeout(() => {
                this.selectedMenu = true;
            }, 300);

            this.$router.push({name:value})

        },
    },

    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 100);
    },
    beforeUpdate() {
        if (this.$route.name === 'layerTools'){
            this.selectedMenu = false
            this.show = true;
        }

    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.styleBtn .v-card-text {
    font-size: 11px !important;
    font-weight: 600 !important;
    text-align: center !important;
    color: rgb(0, 0, 0) !important;
}
</style>
