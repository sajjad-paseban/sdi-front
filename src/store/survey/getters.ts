import {GetterTree} from "vuex";
import {ArchiveData, CodingTableRecord, MainDialog, Survey, SurveyLayers, TaskbarInfo} from "@/store/survey/types";
import {RootState} from "@/store/types";
import Feature from 'ol/Feature.js';
import {Arse, BusinessUnitInfo} from "@/models/Survey.interface";
import {AddProcessItem} from "@/api/surveyPanel/SD.Models/addProcess.sd";
import {PanelUser} from "@/models/SurveyPanel.interface";


export const getters: GetterTree<Survey,RootState>= {
    getCloseDrawFeature(state): boolean {
        return state.closeDrawFeature
    },

    getPanelUser(state): PanelUser | null {
        return state.panel_user
    },

    getArchiveData(state): ArchiveData | null {
        return state.archiveData
    },

    getPanelTopic(state): string | null {
        return state.panelTopic
    },

    getMainDialog(state): MainDialog | null {
        return state.mainDialog
    },

    getBusinessUnitInfo(state): BusinessUnitInfo | null {
        return state.businessUnitInfo
    },

    getTaskBarInfo(state): TaskbarInfo {
        return state.taskBarInfo
    },

    getLoadDataFromSdi(state): boolean {
        return state.loadFromSdi
    },

    getDrawFeature(state): Feature | null {
        return state.drawFeature
    },

    getActiveDraw(state): boolean {
        return state.activeDraw
    },

    getShowFeatures(state): Feature[] {
        return state.showFeatures
    },

    getEditFeatures(state): Feature[] {
        return state.editFeatures
    },

    getSurveyLayers(state): SurveyLayers[] {
        return state.survey_layers
    },
    getSurveyCoding(state): CodingTableRecord[] {
        return state.coding_table
    },

    getMapDisable(state): boolean {
        return state.mapDisable
    },

    getArseInfo(state): Arse|null {
        return state.arseInfo
    },
}