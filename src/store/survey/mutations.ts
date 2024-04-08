import {MutationTree} from "vuex";
import {
    ArchiveData,
    CodingTableRecord, MainDialog,
    Survey,
    SurveyLayers,
    TaskbarInfoCode,
    TaskbarInfoFeatures, UpdateShowTree,
} from "@/store/survey/types";
import Feature from 'ol/Feature.js';
import {Arse, BusinessUnitInfo} from "@/models/Survey.interface";
import {AddProcessItem} from "@/api/surveyPanel/SD.Models/addProcess.sd";
import {PanelUser} from "@/models/SurveyPanel.interface";


export enum SurveyMutations {
    SET_DRAW_FEATURE = 'SET_DRAW_FEATURE',
    SET_ACTIVE_DRAW = 'SET_ACTIVE_DRAW',
    SET_LOAD_FROM_SDI = 'SET_LOAD_FROM_SDI',
    SET_SHOW_FEATURES = 'SET_SHOW_FEATURES',
    SET_SURVEY_LAYERS = 'SET_SURVEY_LAYERS',
    SET_CODING_TABLE = 'SET_CODING_TABLE',
    SET_MAP_DISABLE = 'SET_MAP_DISABLE',
    SET_ARSE_INFO = 'SET_ARSE_INFO',
    SET_BUSINESS_UNIT_INFO = 'SET_BUSINESS_UNIT_INFO',
    SET_EDIT_FEATURES = 'SET_EDIT_FEATURES',
    SET_TASKBAR_INFO_OWNER_NAME = 'SET_TASKBAR_INFO_OWNER_NAME',
    SET_TASKBAR_INFO_PANEL_NAME = 'SET_TASKBAR_INFO_PANEL_NAME',
    SET_TASKBAR_INFO_CODE = 'SET_TASKBAR_INFO_CODE',
    SET_TASKBAR_INFO_FEATURES = 'SET_TASKBAR_INFO_FEATURES',
    SET_ARCHIVE_DATA = 'SET_ARCHIVE_DATA',
    SET_MAIN_DIALOG = 'SET_MAIN_DIALOG',
    SET_PANEL_TOPIC = 'SET_PANEL_TOPIC',
    SET_PANEL_USER = 'SET_PANEL_USER',
    SET_CLOSE_DRAW_FEATURE = 'SET_CLOSE_DRAW_FEATURE'
}

export const mutations: MutationTree<Survey> = {
    [SurveyMutations.SET_CLOSE_DRAW_FEATURE](state, payload: boolean): void {

        state.closeDrawFeature = payload
    },

    [SurveyMutations.SET_PANEL_USER](state, payload: PanelUser): void {

        state.panel_user = payload
    },

    [SurveyMutations.SET_ARCHIVE_DATA](state, payload: ArchiveData): void {

        state.archiveData = payload
    },

    [SurveyMutations.SET_PANEL_TOPIC](state, payload: string): void {

        state.panelTopic = payload
    },

    [SurveyMutations.SET_MAIN_DIALOG](state, payload: MainDialog): void {

        state.mainDialog = payload
    },

    [SurveyMutations.SET_DRAW_FEATURE](state, payload: Feature): void {

        state.drawFeature = payload
    },

    [SurveyMutations.SET_TASKBAR_INFO_OWNER_NAME](state, payload: string): void {

        state.taskBarInfo.ownerName = payload
    },
    [SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME](state, payload: string): void {

        state.taskBarInfo.panelName = payload
    },
    [SurveyMutations.SET_TASKBAR_INFO_CODE](state, payload: TaskbarInfoCode): void {

        state.taskBarInfo.code = payload
    },

    [SurveyMutations.SET_TASKBAR_INFO_FEATURES](state, payload: TaskbarInfoFeatures[]): void {

        state.taskBarInfo.features = payload
    },

    [SurveyMutations.SET_BUSINESS_UNIT_INFO](state, payload: BusinessUnitInfo): void {

        state.businessUnitInfo = payload
    },

    [SurveyMutations.SET_LOAD_FROM_SDI](state, payload: boolean): void {

        state.loadFromSdi = payload
    },

    [SurveyMutations.SET_ACTIVE_DRAW](state, payload: boolean): void {

        state.activeDraw = payload
    },

    [SurveyMutations.SET_SHOW_FEATURES](state, payload: Feature[]): void {

        state.showFeatures = payload
    },

    [SurveyMutations.SET_EDIT_FEATURES](state, payload: Feature[]): void {

        state.editFeatures = payload
    },

    [SurveyMutations.SET_SURVEY_LAYERS](state, payload: SurveyLayers[]): void {

        state.survey_layers = payload
    },
    [SurveyMutations.SET_CODING_TABLE](state, payload: CodingTableRecord[]): void {

        state.coding_table = payload
    },
    [SurveyMutations.SET_MAP_DISABLE](state, payload: boolean): void {

        state.mapDisable = payload
    },

    [SurveyMutations.SET_ARSE_INFO](state, payload: Arse | null): void {

        state.arseInfo = payload
    },
}