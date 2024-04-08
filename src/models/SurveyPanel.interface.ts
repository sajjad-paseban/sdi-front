import {usersObject} from "@/models/User.interface";
import {LayerItem} from "@/store/openLayer/types";
import {SurveyRegionInfoValidator} from "@/api/surveyPanel/validations/getSurveyRegionInfo.vd";
import Feature from "ol/Feature";
import {EnumsTableItem} from "@/models/Survey.interface";
import GeoJSONFeature from "ol/format/GeoJSON";

export interface Checker {
    id: number,
    user: usersObject,
    code: string,
    edit_access?:boolean
}

export interface Manager {
    id: number,
    user: usersObject,
    code: string
}

export interface SurveyPerson {
    id: number,
    user: usersObject,
    code: string,
    arse_layer: LayerItem | null,
    building_layer: LayerItem | null,
    extra_layer: LayerItem | null,
    apartment_layer: LayerItem | null
}

export interface SurveyPanelUsers {
    checkers: Checker[],
    managers: Manager[],
    surveys: SurveyPerson[]
}

export interface SurveyRegionInfo {
    id: number,
    user: usersObject,
    code: string,
    all_estimated_features: number,
    features_done: number,
    biggest_end_date: string | null,
    features: Feature[],
    color?: string,
}

export interface CheckerRegionInfo {
    id: number,
    user: usersObject,
    code: string,
    all_estimated_features: number,
    features_done: number,
    biggest_end_date: string | null,
    features: Feature[]
}

export interface AllUsersList {
    id: number,
    user: usersObject,
    code: string,
    all_estimated_features: number,
    features_done: number,
    biggest_end_date: string | null,
    features: Feature[]
    user_type: string,
    color?: string
}

export interface SurveyProcessItem {
    id: number,
    feature: Feature,
    completing: number,
    referral_to_survey: number,
    finalConfirm: number,
    code: string,
    start_date: string,
    end_date: string,
    lock_in_place: boolean,
    estimated_features: number,

    checker: Checker,
    color?: string,
}


export interface CheckerProcessItem {
    id: number,
    feature: Feature,
    referral_to_survey: number,
    referral_to_manager: number,
    referral_to_checker: number,
    finalConfirm: number
    code: string,
    start_date: string,
    end_date: string,
    lock_in_place: boolean,
    estimated_features: number,
    survey_person: Checker,
    color?: string,
}

export interface ArseLog {
    status: string,
    created_at: string,
    user: number
}

export interface ArseItem {
    id: number,
    area: number,
    explanation: string | null,
    code: string,
    arse_log: ArseLog[],
    lock_in_place: boolean,
    code_location: number,
    code_physical_natures: number,
    feature: Feature,
    color?: string
}

export interface BlockItem {
    id: number,
    explanation: string | null,
    code: string,
    status: string,
    update_date: string,
    block_arse: ArseItem[]
}

export interface BlockLog {
    id?: number,
    explanation: string | null,
    images?: File[]
    sources?: string[],
    status: BlockStatusEnums | null
}

export interface ShowBlockItem {
    id: number,
    explanation: string | null,
    code: string,
    status: string,
    update_date: string,
    block_arse: ArseItem[]
    show_block_arse: ArseItem[],
    searchText: string,
    color?: string,
    feature?:Feature
}

export interface initBlockInfo {
    status: string,
    explanation: string | null,
    update_date: string,
    update_time:string,
    images: string[],
    person:string,
}

export interface ProcessListItem {
    id: number,
    feature: Feature,
    manager: Manager,
    checker: Checker,
    survey_person: Checker,
    code: string,
    start_date: string,
    end_date: string,
    lock_in_place: boolean,
    estimated_features: number,
    color?: string

}

export enum ArseStatusEnums {
    Complete = 'برداشت کامل',
    NotPresentOwner = 'عدم حضور مالک',
    NoAccess = 'عدم دسترسی',
    ConfirmController = 'تایید کنترلر',
    RejectController = 'عدم تایید کنترلر',
    ConfirmManager = 'تایید مدیر',
    RejectManager = 'عدم تایید مدیر',
}


export enum BlockStatusEnums {
    Completing = 'در حال تکمیل',
    ReturnToChecker = 'بازگشت به کنترلر',
    ReferralToManager = 'ارجاع به مدیر',
    ReferralToChecker = 'ارجاع به کنترلر',
    ReturnToSurvey = 'بازگشت به ممیزی',
    FinalConfirm = 'تایید نهایی',
}

export enum PanelUserType {
    Manager = 'manager',
    Checker = 'checker',
    Survey = 'survey',
}

export interface PanelUser {
    info: usersObject,
    id: number
    user_type: string
}
