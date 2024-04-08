<template>
    <div class=" myForm">
        <v-list-item

                nav


        >
            <template v-slot:default>
                <v-text-field
                        density="compact"
                        variant="solo"
                        class="mr-1"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        label="جستجو"
                        v-model="serchValue"
                        @update:model-value="filterItems()"

                ></v-text-field>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav  style="overflow: hidden" color="primary">
            <v-list-item @click="itemClick(item)" :title="item.name" :value="item.name" v-for="item in items" :key="item.name">
                <template v-slot:prepend>
                    <v-img
                            v-if="item.legend"
                            class="rounded-lg ma-1 ml-4 mr-0 "

                            :src="item.legend"
                            width="20"
                            height="20"
                    />
                    <v-img
                            v-else
                            class="rounded-lg  ml-8"
                            src="@/assets/cImages/logo.png"
                            width="20"
                            height="20"
                    />

                </template>
            </v-list-item>

        </v-list>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";

    export interface Item {
        name: string;
        [propName: string]: any;
    }

    export default   defineComponent({
            name: "myListForSpliterComponent",
            components: {},

            props: {
                data: {
                    type: Array as PropType<Item[]>,
                    required: true,
                },


            },

            data() {
                return {
                    serchValue: "" as string,

                    items: [] as Item[],
                };
            },
            methods: {
                filterItems: function () {
                    this.items= this.data.filter((item) => {
                        return item.name.includes(this.serchValue);
                    });


                },

                itemClick: function (item: Item) {
                    // console.log({ ...item },'item click');
                    this.$emit('itemClick', {...item})
                },
            },
            watch: {
                data(){
                    this.items = this.data;
                }
            },
            mounted() {
                this.items = this.data;
            },
        });



</script>

<style></style>
