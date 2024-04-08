<template>
    <div style="height: 100%; width: 100%; background-color: #f3f3f33b">
        <div class="pa-2 mysub">
            <v-row class="ma-0 pa-0">
                <p style="font-size: 10px; line-height: 20px">
                    در بخش با دو قابلیت مجوز لایه و مجوز قابلیت های برنامه ، میتوانید سطوح
                    دسترسی متفاوتی برای نقش ها ایجاد نمایید .
                </p>
            </v-row>
            <v-row class="ma-0 pa-0">
                <p style="font-size: 10px; line-height: 20px">
                    برای انجام تنظیمات ایتدا کاربر را انتخاب نمایید و بعد از آن تنظیمات را
                    اعمال کنید.
                </p>
            </v-row>
        </div>
        <v-row class="ma-0 pa-0 addRole" justify="center">


            <v-col cols="12" md="10" class="pt-4" style="height: calc(100% - 30px)">
                <v-fade-transition>
                    <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </v-row>
                </v-fade-transition>
                <v-row v-show="initShow" class="pa-0 ma-0">
                    <div class="myForm" style="width: 200px">
                        <v-autocomplete
                                :items="rolesWithParentName"
                                item-title="name"
                                item-value="id"
                                density="compact"
                                v-model="role"
                                variant="solo"
                                required
                        >
                            <template v-slot:prepend-inner>
                                <v-icon color="primary" icon="mdi-sitemap"/>
                            </template>

                            <template v-slot:label>
                                <!-- <p  class="text-primary">نام لایه</p> -->
                                <p class="">نام نقش</p>
                            </template>
                        </v-autocomplete>
                    </div>
                    <v-spacer/>
                    <div class="access">
                        <v-btn-toggle
                                class="my-1"
                                v-model="accessType"
                                dense
                                rounded="xl"
                                density="compact"
                                color="primary"
                                divided
                                style="background-color: #f3f3f3"
                        >
                            <v-btn
                                    @click="accessTypeChange('layer')"
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    value="layer"
                            >
                                <v-avatar size="20" class="">
                                    <v-img
                                            class=""
                                            src="@/assets/icons/layer.png"
                                            alt="John"
                                    ></v-img>
                                </v-avatar>
                            </v-btn>

                            <v-btn
                                    variant="outlined"
                                    @click="accessTypeChange('app')"
                                    size="small"
                                    color="primary"
                                    value="app"
                            >
                                <v-avatar size="20" class="">
                                    <v-img
                                            class=""
                                            src="@/assets/icons/config.png"
                                            alt="John"
                                    ></v-img>
                                </v-avatar>
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </v-row>
                <v-row v-show="initShow" class="pa-0 ma-0 accessTree">
                    <v-fade-transition>
                        <v-card
                                :disabled="!role"
                                v-show="accessType === 'layer'"
                                class="pa-4 rounded-lg border"
                                height="100%"
                                width="100%"
                                style="overflow: auto"
                        >
                            <v-row class="pa-0 ma-0 mb-4">
                                <p>لایه ها</p>
                                <v-spacer></v-spacer>
                                <v-row class="ma-0 pa-0 mb-1" justify="end">
                                    <v-btn
                                            variant="text"
                                            size="x-small"
                                            color="primary"
                                            class="rounded-lg ml-1"
                                            :style="groupLayerAccessValue['edit']?'background-color: rgb(var(--v-theme-primary_active2))!important':''"
                                            @click="groupLayerAccessBtn('edit',roleLayersAccess,!groupLayerAccessValue['edit'])"

                                    >
                                        <v-avatar size="20" class="">
                                            <v-img
                                                    class=""
                                                    src="@/assets/icons/edit.png"
                                                    alt="John"
                                            ></v-img>
                                        </v-avatar>
                                    </v-btn>

                                    <v-btn
                                            variant="text"
                                            size="x-small"
                                            color="primary"
                                            class="rounded-lg ml-1"
                                            :style="groupLayerAccessValue['delete']?'background-color: rgb(var(--v-theme-primary_active2))!important':''"
                                            @click="groupLayerAccessBtn('delete',roleLayersAccess,!groupLayerAccessValue['delete'])"

                                    >
                                        <v-avatar size="20" class="">
                                            <v-img
                                                    class=""
                                                    src="@/assets/icons/delete.png"
                                                    alt="John"
                                            ></v-img>
                                        </v-avatar>
                                    </v-btn>

                                    <v-btn
                                            variant="text"
                                            size="x-small"
                                            color="primary"
                                            class="rounded-lg ml-1"
                                            :style="groupLayerAccessValue['show']?'background-color: rgb(var(--v-theme-primary_active2))!important':''"
                                            @click="groupLayerAccessBtn('show',roleLayersAccess,!groupLayerAccessValue['show'])"

                                    >
                                        <v-avatar size="20" class="">
                                            <v-img
                                                    class=""
                                                    src="@/assets/icons/see.png"
                                                    alt="John"
                                            ></v-img>
                                        </v-avatar>
                                    </v-btn>
                                    <v-btn
                                            variant="text"
                                            size="x-small"
                                            color="primary"
                                            class="rounded-lg"
                                            :style="groupLayerAccessValue['active_layer']?'background-color: rgb(var(--v-theme-primary_active2))!important':''"
                                            @click="groupLayerAccessBtn('active_layer',roleLayersAccess,!groupLayerAccessValue['active_layer'])"

                                    >
                                        <v-avatar size="20" class="">
                                            <v-img
                                                    class=""
                                                    src="@/assets/icons/active.png"
                                                    alt="John"
                                            ></v-img>
                                        </v-avatar>
                                    </v-btn>
                                </v-row>
                            </v-row>
                            <div
                                    class="pa-0 ma-0 mt-4 pa-2 rounded-lg elevation-2 border"
                                    style="height: max-content;width: 100%"
                            >
                                <Tree
                                        v-for="item in roleLayersAccess"
                                        :key="item.id"
                                        :item="item"
                                        :label="'name'"
                                        :image="'image'"
                                        :key-object="'id'"
                                        @checkBoxChange="checkBoxChange"
                                        :activeCheckBox="true"
                                        dir="rtl"
                                >
                                    <template #action="actionPrps">

                                        <v-row class="ma-0 pa-0 mb-1" justify="end">
                                            <v-btn
                                                    variant="text"
                                                    size="x-small"
                                                    color="primary"
                                                    class="rounded-lg ml-1"
                                                    :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.edit?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"
                                                    @click="actionClick(actionPrps.item,'edit')"
                                            >
                                                <v-avatar size="20" class="">
                                                    <v-img
                                                            class=""
                                                            src="@/assets/icons/edit.png"
                                                            alt="John"
                                                    ></v-img>
                                                </v-avatar>
                                            </v-btn>

                                            <v-btn
                                                    variant="text"
                                                    size="x-small"
                                                    color="primary"
                                                    class="rounded-lg ml-1"
                                                    :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.delete?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"
                                                    @click="actionClick(actionPrps.item,'delete')"
                                            >
                                                <v-avatar size="20" class="">
                                                    <v-img
                                                            class=""
                                                            src="@/assets/icons/delete.png"
                                                            alt="John"
                                                    ></v-img>
                                                </v-avatar>
                                            </v-btn>

                                            <v-btn
                                                    variant="text"
                                                    size="x-small"
                                                    color="primary"
                                                    class="rounded-lg ml-1"
                                                    :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.show?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"
                                                    @click="actionClick(actionPrps.item,'show')"
                                            >
                                                <v-avatar size="20" class="">
                                                    <v-img
                                                            class=""
                                                            src="@/assets/icons/see.png"
                                                            alt="John"
                                                    ></v-img>
                                                </v-avatar>
                                            </v-btn>
                                            <v-btn
                                                    variant="text"
                                                    size="x-small"
                                                    color="primary"
                                                    class="rounded-lg"
                                                    :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.active_layer?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"
                                                    @click="actionClick(actionPrps.item,'active_layer')"
                                            >
                                                <v-avatar size="20" class="">
                                                    <v-img
                                                            class=""
                                                            src="@/assets/icons/active.png"
                                                            alt="John"
                                                    ></v-img>
                                                </v-avatar>
                                            </v-btn>
                                        </v-row>

                                    </template>
                                </Tree>
                            </div>
                        </v-card>
                    </v-fade-transition>

                    <v-fade-transition>
                        <v-card
                                :disabled="!role"
                                v-show="accessType === 'app'"
                                class="pa-4 pt-2 rounded-lg border"
                                height="100%"
                                width="100%"
                                style=""
                        >
                            <v-row class="pa-0 ma-0 mb-2">
                                <p>ماژول ها</p>

                            </v-row>
                            <div
                                    class="pa-0 ma-0 mt-1 pa-2 rounded-lg elevation-2"
                                    style="height: calc(100% - 25px);overflow: auto"
                            >
                                <Tree
                                        v-for="item in accessesTree"
                                        :key="item.id"
                                        :initSelected="roleAccess"
                                        :item="item"
                                        :key-object="'id'"
                                        :label="'e_name'"
                                        @checkBoxChange="checkBoxChange"
                                        :activeCheckBox="true"
                                        dir="rtl"
                                >

                                </Tree>
                            </div>
                        </v-card>
                    </v-fade-transition>
                </v-row>
                <v-row v-show="initShow" class="ma-0 pa-0 my-2" justify="end">
                    <v-btn
                            class="elevation-1"
                            variant="tonal"
                            append-icon="mdi-content-save"
                            style="font-weight: bold !important; font-size: 10px"
                            rounded="lg"
                            size="small"
                            @click="editRoleAccessAction"
                            color="primary"
                    >ذخیره
                    </v-btn
                    >
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {toArabicNumber} from "@/assets/toFarsi";
    import Tree from "@/components/common/tree.vue";
    import role from "@/componentFunctions/roles_functions";
    import access from "@/componentFunctions/access_functions";
    import {TreeAccess} from "@/models/Access.interface";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";

    interface Item {
        key: string;
        label: string;
        children: Item[];
    }

    export default defineComponent({
        name: "accesssComponent",
        components: {Tree},
        setup() {
            const {rolesWithParentName, getRolesWithParentName, editRoleAccess} = role()
            const {getAccessTree, accessesTree, getRoleAccessByName, roleAccess, getRoleLayerAccess, roleLayersAccess, saveRoleLayerAccess} = access()

            const initData = ref(false)
            const router = useRouter()
            const toast = useToast()

            onMounted(async () => {
                await getRolesWithParentName()
                await getAccessTree()

                initData.value = true
            })

            return {
                rolesWithParentName,
                initData,
                accessesTree,
                getRoleAccessByName,
                roleAccess,
                editRoleAccess,
                getRoleLayerAccess,
                roleLayersAccess,
                saveRoleLayerAccess,router,toast
            }
        },
        data() {
            return {
                role: null,

                initShow: false,

                accessType: "app",

                groupLayerAccessValue: {
                    'edit': false,
                    'delete': false,
                    'show': false,
                    'active_layer': false
                },

                //--------for tree-----------//
                selectResult: [] as number[],
                //--------for tree-----------//
            };
        },
        props: {},
        watch: {
            async role() {
                if (this.role) {
                    await this.getRoleAccessByName(this.role)
                    await this.getRoleLayerAccess(this.role)

                }

            },
            initData() {
                if (this.initData) {
                    setTimeout(() => {
                        this.initShow = true
                    }, 300)
                }
            }
        },
        methods: {

            accessTypeChange(val: string) {
                this.accessType = ''
                setTimeout(() => {
                    this.accessType = val
                }, 500)

            },

            async editRoleAccessAction() {
                console.log(this.roleLayersAccess, {access: this.selectResult, role: this.role})
                if (this.role) {
                    const res1 = await this.editRoleAccess({access: this.selectResult, role: this.role})
                    const res2 = await this.saveRoleLayerAccess(this.roleLayersAccess, this.role)

                    if (res1 && res2) {
                        this.router.push({name: 'manageRolesList'})
                        this.toast.add({
                            group: 'tr',
                            life: 7000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'دسترسی نقش تغییر کرد '
                        });

                    }
                }

            },

            actionClick(item: any, field: any) {
                //--------for tree-----------//
                if (item.layer_access) {
                    if (item.layer_access[field]) {
                        item.layer_access[field] = false
                    } else {
                        item.layer_access[field] = true
                    }
                }
            },

            groupLayerAccessBtn(field: string, items: any, value: boolean) {
                if (field === 'edit') {
                    this.groupLayerAccessValue.edit = value
                }
                if (field === 'delete') {
                    this.groupLayerAccessValue.delete = value
                }
                if (field === 'show') {
                    this.groupLayerAccessValue.show = value
                }
                if (field === 'active_layer') {
                    this.groupLayerAccessValue.active_layer = value
                }
                items.map((i: any) => {
                    if (i.children) {
                        this.groupLayerAccessBtn(field, i.children, value)
                    } else {
                        if (this.selectResult.includes(i.id) && i.layer_access) {
                            i.layer_access[field] = value
                        }
                    }
                })

            },

            //--------for tree-----------//
            checkBoxChange(data: { value: boolean; id: number }) {
                if (data.value) {
                    this.selectResult.push(data.id);
                } else {
                    this.selectResult = this.selectResult.filter((e) => e !== data.id);
                }

                this.selectResult = [...new Set(this.selectResult)];

            },

            treeItemClick(item: Item) {
                console.log(item);
            },
            //--------for tree-----------//
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .addRole {
        height: calc(100% - 56px);
        overflow: auto;
    }

    @media only screen and (max-width: 900px) {
        .addRole {
            height: 100%;
            overflow: auto;
        }
    }

    .accessTree {
        height: calc(100% - 60px);
    }

    .access .v-btn-group--density-compact.v-btn-group {
        height: 30px;
    }

    @media only screen and (max-height: 500px) {
        .access .v-btn-group--density-compact.v-btn-group {
            height: 20px;
        }

        .accessTree {
            height: calc(100% - 10px);
        }
    }
</style>
