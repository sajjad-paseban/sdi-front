<template>
    <div class="elevation-1 rounded-lg py-3 pr-1 pl-1  elevation-3" style="background-color:white;width: 100%;height: 100%">

            <Tree1
                    v-for="item in nodes"
                    :key="item.key"
                    :item="item"
                    @checkBoxChange="checkBoxChange"
                    :activeCheckBox="false"
                    :itemClick="treeItemClick"
                    :label="'label'"
                    :activeItem="activeItem"
                    :image="'image'"
                    dir="rtl"
            ></Tree1>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Tree1 from "@/components/common/tree.vue";


    interface Item {
        label: string;
        to: string;
        des: string;
    }
    export default defineComponent({
        name: "layerTree",
        components: {Tree1},
        data() {
            return {
                //--------for tree-----------//
                selectResult: [] as string[],
                nodes: [
                    {
                        key: "0",
                        label: "منطقه1",
                        image:'/cImages/logo.png',
                        children: [
                            {
                                key: "4",
                                label: "ملک ",
                                image:'/cImages/logo.png',
                                children: [
                                    {
                                        key: "5",
                                        label: "ملک 1400",
                                        image:'/cImages/logo.png',
                                    },
                                ],
                            },
                            {
                                key: "3",
                                label: "سنفی",
                                image:'/cImages/logo.png',
                            },
                        ],
                    },
                    {
                        key: "1",
                        label: "منطقه 2",
                        image:'/cImages/logo.png',
                    },
                    {
                        key: "2",
                        label: "منطقه 3",
                        image:'/cImages/logo.png',
                    },
                ],
                activeItem:null as Item|null
                //--------for tree-----------//
            };
        },
        directives: {

        },

        props: {

        },
        methods: {
            //--------for tree-----------//
            checkBoxChange(data: { value: boolean; id: string }) {
                if (data.value) {
                    this.selectResult.push(data.id);
                } else {
                    this.selectResult = this.selectResult.filter((e) => e !== data.id);
                }

                this.selectResult = [...new Set(this.selectResult)];
                console.log(this.selectResult);
            },
            treeItemClick(item: Item) {
                this.activeItem = item
                this.$emit('treeClick',item)
            },
            //--------for tree-----------//
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>



</style>
