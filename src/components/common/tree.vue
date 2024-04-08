<template>
    <div style="display: grid;position: relative" class="myForm  " ref="test" >
        <v-row class="ma-0 pa-0  rounded" justify="start" align="center"
               :style="((activeItem?activeItem[keyObject]:0) === item[keyObject] && !item.children)?'background-color: #ece2fc':''">
            <p v-if="!first" class="mt-n3" style="margin-right: .5px">__</p>
            <div v-if="!first" :style="lastItem?(item.children && showChild?box:boxLast):box"></div>
            <!--            <div v-else :style="firstItem?boxFirst:(lastItem?(lastItem && item.children && showChild?'':boxLast):'')"></div>-->
            <v-icon
                    v-if="item.children && !showChild"
                    @click="collapseHandler"
                    class="mx-n1" style="margin-top: -2px"
                    size="small"
            >mdi-chevron-left
            </v-icon>
            <v-icon
                    v-else-if="item.children && showChild"
                    @click="collapseHandler"
                    class="mx-n1"
                    size="small"
            >mdi-chevron-down
            </v-icon>
            <template v-else>
                <p v-if="!first" class="mt-n3 ml-n1">__</p>
                <p v-else style="margin-right: 12px"></p>
            </template>

            <template v-if="item.children">
                <v-checkbox-btn
                        v-if="activeCheckBox"
                        :indeterminate="indeterminate"
                        v-model="checkBoxValue"
                        @click="checkBoxHandler"
                        class=""
                        style="margin-top: -2px;margin-right:5px "
                        density="compact"
                ></v-checkbox-btn>
            </template>
            <template v-else>
                <v-checkbox-btn
                        v-if="activeCheckBox"
                        :indeterminate="indeterminate"
                        v-model="checkBoxValue"
                        @click="checkBoxHandler"
                        class=""
                        style="margin-top: -2px;margin-right:-1px;z-index: 10001 "
                        density="compact"
                ></v-checkbox-btn>
            </template>


            <v-avatar size="22" class="" style="padding: 2px" v-if="image">
                <v-img v-if="item[image]" class="" :src="item[image]" alt="John"></v-img>
                <v-img v-else class="" src="@/assets/cImages/logo.png" alt="John"></v-img>
            </v-avatar>
            <p
                    v-if="label" class="rounded-lg font-weight-bold"
                    style="
          font-size: 10px;
          margin-top: 3px;
          max-width: 180px;
          margin-right: 7px;
          cursor: pointer;z-index:100003"
                    @click="treeItemClick" >
                {{ item[label] }}
            </p>
            <slot name="label" :item="item"></slot>
            <v-spacer></v-spacer>


            <slot name="action" :item="item"></slot>

            <!-- <v-icon @click="setActiveLayer" size="small">mdi-bookmark-plus</v-icon> -->
        </v-row>

        <div style="padding-right:20px;" v-show="item.children && showChild" class="">
            <treeComponent
                    v-for="(i,index) in item.children"
                    :key="i.key"
                    :last-item="(index+1) === item.children.length"
                    :first="false"
                    :item="i"
                    :initSelected="initSelected"
                    :activeCheckBox="activeCheckBox"
                    :parentCheckbox="checkBoxValue"
                    :key-object="keyObject"
                    @checkBoxChange="childChangeCheckBoxHandler"
                    :activeItem="activeItemChild"
                    :itemClick="itemClick"
                    :label="label"
                    :image="image"
                    :box-style="box"
                    :collapse-all="collapseAll"
                    :expand-all="expandAll"
            >
                <template #action="{ item }">
                    <slot name="action" :item="item"></slot>
                </template>
                <template #label="{ item }">
                    <slot name="label" :item="item"></slot>
                </template>
            </treeComponent>


        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, PropType, ref} from "vue";
    import {useElementSize} from '@vueuse/core'
    import {any} from "zod";


    interface Item {
        [propName: string]: any;

        children?: Item[];
    }

    export default defineComponent({
        name: "treeComponent",
        components: {},
        setup(props) {
            const test = ref(null)
            const {height} = useElementSize(test)
            const box = ref<string>()
            const boxLast = ref<string>()
            onMounted(() => {
                box.value = 'top:0;background: rgba(240, 128, 128, 0);border-right:1px solid #000000;width: 5px;position: absolute;height:' + height.value + 'px;'
                boxLast.value = 'top:0;background: rgba(240, 128, 128, 0);border-right:1px solid #000000;width: 5px;position: absolute;height:' + height.value/2 + 'px;'
            })
            return {
                height, test, box,boxLast
            }
        },

        data() {
            return {
                showChild: false,

                checkBoxValue: false,
                indeterminate: false,
                childCheckbox: false,

                activeItemChild: null as any,

                childSelectResult: [] as string[],
            };
        },

        props: {
            initSelected: {
                type: Array as PropType<any>,
                required: false,
            },
            item: {
                type: Object as PropType<Item>,
                required: true,
            },
            parentCheckbox: {
                type: Boolean,
                default: false,
            },

            label: {
                type: String,
                default: null,
            },

            keyObject: {
                type: String,
                default: 'key'
            },

            image: {
                type: String,
                default: null,
            },

            activeCheckBox: {
                type: Boolean,
                default: false,
            },


            itemClick: {
                type: Function,
                required: false,
            },
            activeItem: {
                required: false,
                type: Object
            },
            lastItem: {
                required: false,
                type: Boolean,
                default: false
            },
            first: {
                required: false,
                type: Boolean,
                default: true
            },
            boxStyle: {
                required: false,
                type: String,
            },
            expandAll:{
                required:false,
                type:Boolean,
                default:false
            },
            collapseAll:{
                required:false,
                type:Boolean,
                default:true
            }

        },

        mounted(): void {
            if (this.collapseAll)
                this.showChild=false
            if (this.expandAll)
                this.showChild=true

            if (this.initSelected && this.initSelected.includes(this.item[this.keyObject])) {
                this.checkBoxHandler()
            }
        },

        methods: {
            treeItemClick() {
                if (this.itemClick) {
                    this.itemClick(this.item);
                }
            },


            collapseHandler() {
                this.showChild = !this.showChild;
            },

            checkBoxHandler() {
                this.checkBoxValue = !this.checkBoxValue

                this.indeterminate = false;

                if (!this.item.children) {
                    this.$emit("checkBoxChange", {
                        value: this.checkBoxValue,
                        id: this.item[this.keyObject],
                    });
                }
            },

            childChangeCheckBoxHandler(data: { value: boolean; id: string }) {


                if (data.value) {
                    this.childSelectResult.push(data.id);
                } else {
                    this.childSelectResult = this.childSelectResult.filter(
                        (e) => e !== data.id
                    );
                }


                let result = this.checkChildCheckBoxValue(this.item);
                switch (result) {
                    case 0:
                        this.indeterminate = true;
                        break;
                    case 1:
                        this.indeterminate = false;
                        this.checkBoxValue = true;

                        break;
                    default:
                        this.indeterminate = false;
                        this.checkBoxValue = false;
                }

                this.$emit("checkBoxChange", {
                    value: data.value,
                    id: data.id,
                });
            },

            checkChildCheckBoxValue(item: Item): number {
                let childsChecks = 0;
                let childIndeterminate = false

                if (item.children) {
                    item.children.forEach((child) => {
                        if (child.children) {
                            let result = this.checkChildCheckBoxValue(child);
                            if (result !== 2) {
                                if (result === 0) {
                                    childIndeterminate = true
                                } else {
                                    childsChecks++;
                                }

                            }
                        } else {
                            if (this.childSelectResult) {
                                if (this.childSelectResult.includes(child[this.keyObject])) {
                                    childsChecks++;
                                    childIndeterminate = true
                                }
                            }
                        }
                    });

                    if (item.children.length === childsChecks) {
                        return 1; // همه چک باکس ها خورده شده
                    } else {
                        if (childIndeterminate || childsChecks !== 0) {
                            return 0; // تعدادی از چک باکس ها خورده شده
                        } else {
                            return 2; //هیچ چک باکسی خوزده نشده
                        }
                    }
                } else {
                    return 2;
                }
            },
        },

        watch: {
            parentCheckbox() {
                this.checkBoxValue = this.parentCheckbox;

                if (!this.item.children) {
                    this.$emit("checkBoxChange", {
                        value: this.checkBoxValue,
                        id: this.item[this.keyObject],
                    });
                }
            },

            initSelected() {

                if (this.initSelected.includes(this.item[this.keyObject])) {
                    this.checkBoxHandler()
                }

            },

            activeItem() {
                this.activeItemChild = this.activeItem
            },

            height() {
                this.box = 'top:0;background: rgba(240, 128, 128, 0);border-right:1px solid #000000;width: 5px;position: absolute;height:' + (this.height) + 'px;'
                this.boxLast = 'top:0;background: rgba(240, 128, 128, 0);border-right:1px solid #000000;width: 5px;position: absolute;height:' + ((this.height/2)-1) + 'px;'
            },

            collapseAll(){
                this.showChild = false
            },
            expandAll(){
                this.showChild = true
            }
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
