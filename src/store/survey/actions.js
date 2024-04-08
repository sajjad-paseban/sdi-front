import Api from "@/api/survey/routes";
import { default as PanelApi } from "@/api/surveyPanel/routes";
import { SurveyMutations } from "@/store/survey/mutations";
export var SurveyAction;
(function (SurveyAction) {
    SurveyAction["INIT_SURVEY"] = "INIT_SURVEY";
    SurveyAction["SET_TASKBAR_INFO_FEATURES"] = "SET_TASKBAR_INFO_FEATURES";
    SurveyAction["SET_TASKBAR_INFO_BUILDING_FEATURES"] = "SET_TASKBAR_INFO_BUILDING_FEATURES";
    SurveyAction["GET_USER_INFO_PANEL"] = "GET_USER_INFO_PANEL";
})(SurveyAction || (SurveyAction = {}));
export const actions = {
    async [SurveyAction.GET_USER_INFO_PANEL](context, toast) {
        const res = await PanelApi.getUserInfo();
        if (res.result) {
            await context.commit(SurveyMutations.SET_PANEL_USER, res.result);
        }
        else {
            // setTimeout(()=>{
            //     window.close()
            // },3000)
        }
    },
    async [SurveyAction.INIT_SURVEY](context, toast) {
        const codingResponse = await Api.getSurveyCoding(toast);
        if (codingResponse.result) {
            context.commit(SurveyMutations.SET_CODING_TABLE, codingResponse.result);
        }
        const response = await Api.getSurveyLayers(toast);
        if (response.result) {
            context.commit(SurveyMutations.SET_SURVEY_LAYERS, response.result);
        }
    },
    async [SurveyAction.SET_TASKBAR_INFO_FEATURES](context, arse) {
        const features = [];
        let id = 0;
        if (arse.geometry) {
            id = id + 1;
            features.push({
                id: id,
                name: 'عرصه',
                feature: [arse.geometry],
                group: 5,
                show: false
            });
        }
        if (arse.buildings) {
            arse.buildings.map((building) => {
                if (building.feature) {
                    id = id + 1;
                    const building_obj = {
                        id: id,
                        name: `ساختمان ${building.extra_info.name}`,
                        feature: [],
                        group: 1,
                        show: false
                    };
                    const progress_features = [];
                    const elevator_features = [];
                    const staircase_features = [];
                    const children = [];
                    if (building.progressInfo) {
                        building.progressInfo.map((progress) => {
                            if (progress.feature) {
                                progress_features.push(progress.feature);
                            }
                        });
                    }
                    if (building.elevator_info) {
                        building.elevator_info.map((elevator) => {
                            if (elevator.feature) {
                                elevator_features.push(elevator.feature);
                            }
                        });
                    }
                    if (building.staircase_info) {
                        building.staircase_info.map((staircase) => {
                            if (staircase.feature) {
                                staircase_features.push(staircase.feature);
                            }
                        });
                    }
                    if (progress_features.length > 0) {
                        id = id + 1;
                        children.push({
                            id: id,
                            name: `پیشامدگی ${progress_features.length}`,
                            feature: progress_features,
                            group: 2,
                            show: false
                        });
                    }
                    if (elevator_features.length > 0) {
                        id = id + 1;
                        children.push({
                            id: id,
                            name: `آسانسور ${elevator_features.length}`,
                            feature: elevator_features,
                            group: 3,
                            show: false
                        });
                    }
                    if (staircase_features.length > 0) {
                        id = id + 1;
                        children.push({
                            id: id,
                            name: `راه پله ${staircase_features.length}`,
                            feature: staircase_features,
                            group: 4,
                            show: false
                        });
                    }
                    if (children.length > 0) {
                        id = id + 1;
                        children.push({
                            id: id,
                            name: `ساختمان`,
                            feature: [building.feature],
                            group: 1,
                            show: false
                        });
                        building_obj['children'] = children;
                    }
                    else {
                        building_obj.feature = [building.feature];
                    }
                    features.push(building_obj);
                }
            });
        }
        console.log(features, 'features for show in showFeatures');
        context.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, features);
    },
};
//# sourceMappingURL=actions.js.map