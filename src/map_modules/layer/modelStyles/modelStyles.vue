<template>
    <v-slide-y-transition>
        <div v-if="show" class="py-1" style="height: 100%">

            <v-row class="ma-0 pa-0" align="center" justify="center" style="height: 100%">

                <v-col cols="12" sm="3"  align="center">
                    <v-card

                            @click="menuHandler(1)"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-0"
                            max-width="124"
                            max-height="100"
                    >
                        <v-img src="@/assets/icons/seting.png" height="60px"></v-img>
                        <v-card-text class="ma-0 pa-0 text-black"> تنظیمات پایه </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="3" align="center">
                    <v-card
                            @click="menuHandler(2)"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-0"
                            max-width="124"
                            max-height="100"
                    >
                        <v-img src="@/assets/icons/text.png" height="60px"></v-img>

                        <v-card-text class="ma-0 pa-0"> تنظیمات لیبل </v-card-text>
                    </v-card>
                </v-col>



            </v-row>

        </div>
    </v-slide-y-transition>

    <div v-if="selectedMenu" style="height: 100%;width:100%">
        <router-view></router-view>
    </div>


</template>

<script lang="ts">
    import { defineComponent } from "vue";



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
            menuHandler: function (value: number) {
                setTimeout(() => {
                    this.show = false;
                }, 100);

                setTimeout(() => {
                    this.selectedMenu = true;
                }, 200);

                if (value == 1) {

                    this.$router.push({name:'baseModelStyles'})
                } else if (value == 2) {
                    this.$router.push({name:'labelModelStyles'})
                }

            },
        },

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 100);
        },
        beforeUpdate() {
            if (this.$route.name === 'modelStyles'){
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
