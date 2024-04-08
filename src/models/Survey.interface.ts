import Feature from 'ol/Feature.js';
import {z} from "zod";
import {usersObject} from "@/models/User.interface";
import {ArseStatusEnums} from "@/models/SurveyPanel.interface";

export interface District {
    id?: number,
    direction: number,
    num: number,
    long: number,
    geo_line?: JSON | null,
    adjacent_type: number | null

    gozar_lat?: number | null,
    bar_long?: number | null,
    front_area?: number | null,
    maabar_code?: string | null
    maabar_lat?: number | null,
    maabar_long?: number | null,
    main_maabar?: boolean,
    maabar_feature_json?: JSON | null,

    bezel_area?: number | null,
    has_bezel?: boolean | null,
    explanation?: string | null

    doors?: DarbInfo[],
    wall?: Wall | null,

    relation_id?: number | null,

}

export interface Arse {
    id?: number,
    area: number,
    geometry?: Feature,
    code_location: number,
    code_physical_natures: number,
    explanation: string | null,
    code?: string | null
    districts?: District[],
    arse_parking?: ParkingAndStore | null
    arse_using?: ArseUsingType[]
    arse_range?: ArseRange[],
    arse_yard?: Yard | null,
    buildings?: SelectedBuilding[]
    relation_id?: number | null,
    arse_address?: ApartmentAddress | null,
    arse_owner?: Owner[] | null,

}

export interface ArseUsingType {
    main_use: number,
    area: number,
    relation_id?: number | null,
}

export interface ArseRange {
    code_texture_type_master_group: number | null,
    code_texture_type_slave_group: number | null,
    area: number,
    relation_id?: number | null,
}

export interface Yard {
    water_supply_source: number | null,
    watering_type: number | null,
    well_number: number,
    well_type: number | null,
    garden_area: number | null
    yard_trees: Tree[],
    feature?: Feature | null,
    relation_id?: number | null,
}

export interface Tree {
    tree_type: number | null,
    tree_number: number,
    cut_down_numbers: number
    planting_year: number | null,
    allowed_cut_down_number: number | null,
    relation_id?: number | null,
}

export interface DarbInfo {
    id?: number
    district?: number
    door_material: number,
    door_type: number,
    door_height: number
    door_lat: number
    main_door: boolean,
    door_size: number,
    relation_id?: number | null,
}

export interface Wall {
    district?: number
    wall_type: number | null,
    wall_height: number | null,
    wall_lat: number | null,
    wall_creation?: string | null,
    relation_id?: number | null,

}

export interface ProgressInfo {
    id?: number,
    feature?: Feature,
    area: number,
    direction: number,
    building_district_direction: number,
    balcony_type?: number
    lat: number,
    lon: number,
    rain_catcher?: boolean,
    in_maabar: boolean,
    floors?: {
        floor: number,
        value: boolean
    }[]
}

export interface ElevatorInfo {
    feature?: Feature,
    area: number,
    floors?: {
        floor: number,
        value: boolean
    }[]
}


export interface FloorInfo {
    id?: number,
    area: number,
    floor_height?: number,
    progress_percent?: number | null
    floor_type: number,
    destruction_area?: number,
    finish_year?: number | null,
    units_number: number,

    progress_area?: number
    parking_store_commons?: ParkingAndStoreAndCommons[],
    floor_using?: floorUsage[],

}

export interface BuildingExtraInfo {
    id?: number
    direction: number,
    b_number: number,
    name: string | null,
    floors_num: number,
    roof_area: number,
    infrastructure_area: number,
    stage_building?: number
    view_type?: number,
    building_type?: number,
    historical_status?: number,
    ceiling_cover?: number,
    finish_year?: number | null
    explanation?: string | null,
    code?: string
}

export interface SelectedBuilding {
    id?: number,
    feature?: Feature | null,
    progressInfo?: ProgressInfo[],
    building_floor?: FloorInfo[],
    elevator_info?: ElevatorInfo[] | null,
    staircase_info?: ElevatorInfo[] | null,
    extra_info: BuildingExtraInfo
}

export enum ParkingAndStoreEnums {
    HoleFloor = 'طبقه کامل',
    PicOfFloor = 'بخشی از طبقه',
    Yard = 'حیاط',
    roof = 'پشت بام'
}

export interface ParkingAndStore {
    id?: number,
    kind: ParkingAndStoreEnums,
    area: number,
    numbers: number,
    relation_id?: number | null,
}

export interface Corridor {
    area: number,
}


export type ParkingAndStoreAndCommons_name = 'راهرو' | 'پارکینگ' | 'انباری'

export interface ParkingAndStoreAndCommons {
    name: ParkingAndStoreAndCommons_name
    value: ParkingAndStore | Corridor
}

export interface floorUsage {
    id?: number,
    finish_year?: string | null,
    height?: number,
    beginning_use_time?: string | null,
    change_floor_using_time?: string | null,
    effective_in_units_number?: boolean,
    sharing: boolean,
    stage_building?: number | null,
    group_building?: number | null,
    building_type?: number | null,
    main_use: number
    sub_use: number,
    area: number,
    units_number: null | number
}

export interface EnumsTableItem {
    pk: number,
    title: string,
    value: number,
    code?: number
    tatbigh?: string
    code_texturetypemastergroup?: number
}

export interface EnumField {
    pName: string,
    items: EnumsTableItem[]
}

export interface Aparteman {
    id: number,
    code: string,
    area: number
    geometry?: Feature | null,
    floor_using: floorUsage[],
    share_arse_area: number | null,
    share_area: null | number,
    yard_parking_area: number,
    yard_parking_number: number,
    persons_number: number,
    description: string | null,
    fill_info_date: string | null,
    survey_description: number | null,
    floor_type: number,
    parking_floor_type: number | null,
    store_floor_type: number | null,
    building: BuildingExtraInfo,
    apartment_owner?: Owner[],
    apartment_address?: ApartmentAddress | null,
    apartment_registration?: ApartmentRegistration | null,
    apartment_districts?: District[] | null,
    apartment_facilities?: Facilities[] | null

}

export interface Owner {


    ownership_unit_type: number | null,
    ownership_type: number | null,
    ownership_status: number | null,
    ownership_value: string
    ownership_done: boolean,

    begin_date: string | null,
    end_date: string | null,
    person: Person | null

}


export interface InitAddress {
    major_street: string | null,
    minor_street: string | null,
    alley: string | null,
}

export interface RegistrationValues {
    share_area: number,
    share_arse_area: number
}

export interface ApartmentAddress {
    major_street: string | null,
    minor_street: string | null,
    alley: string | null,
    dead_end: string | null,
    building_block_name: string | null,
    plaque: number | null
    block_name: string | null,
    unit_number: number | null
    phone: string | null,
    mobile: string | null,
    postal_code: string | null,
}

export interface ApartmentRegistration {
    area: number | null,
    share_arse_area: number | null,
    share_area: number | null,
    assigned_area: number | null,
    yard_parking_area: number | null,
    yard_parking_number: number | null,
    persons_number: number | null,
    description: string | null

}

export interface Facilities {
    facilities_type: number,
    area_count: number,
    code: string,
    description: string | null
}

export interface BusinessUnitInfo {
    id?: number,
    code: string,
    area: number,
    store_area: number,
    out_area: number,
    floor_type: number | null,
    canopy_area: number
    business_mabar_type: number | null,
    business_location_type: number | null,
    business_location_position: number | null,
    maabar_lat: number,
    description: string | null,

    building?: SelectedBuilding | null,
    apartment?: Aparteman | null,

    match: boolean | null,
    opening_payment: boolean | null,
    board_payment: boolean | null,
    canopy_payment: boolean | null,
    possession_type: number | null,
    start_date: string | null,
    end_date: string | null,

    businessUnit_business?: BusinessInfo | null
}

export interface BusinessInfo {
    id?: number,
    name: string,
    business_job_reference: number | null,
    business_job_category: number,
    business_level: number,
    business_pollution_level: number | null,
    no_license_reason: number | null,
    ownership_unit_type: number | null,
    ownership_value: string | null,

    start_date: string | null,
    end_date: string | null,
    settlement_date: string | null,
    employee_count: number | null,

    special_pollution: boolean | null,
    temporary: boolean | null,
    star_business: boolean | null,

    pollution_value: string,

    business_BusinessPerson?: BusinessPerson[] | null,
    business_BusinessVacation?: BusinessVacation[] | null,


}


export interface BusinessPerson {
    id?: number,
    business?: number,
    person: Person | null,
    finish: boolean,
    relationship_type: number | null,
    ownership_value: string,
    start_date: string | null,
    end_date: string | null
}

export interface Person {
    id?: number,
    code: number | null,
    name: string,
    last_name: string,
    father_name: string,
    national_code: string,
    mobile: string | null,
    phone: string | null,
    birthday: string | null,
    address: string | null,
    postal_code: string | null
}

export interface BusinessVacation {
    id?: number,
    business?: number,
    start_date: string | null,
    end_date: string | null,
    description: string | null,
}

export interface BusinessBoard {
    board_type: number | null,
    subject_board: number | null,
    installation_location_board: number | null,
    installation_status_board: number | null,
    owner_board_type: number | null,
    board_width: number | null,
    board_height: number | null,
    height: number | null,
    board_area: number | null,
    progress_area: number | null,
    text: string,
    description: string | null,
    start_date: string | null,
    end_date: string | null,
    business_businessUnit?: number,
}

export interface SaveItem {
    id: number
}

export interface ArchiveGroup {
    id: number,
    title: string,
    value: number,
    master?: number,
    subsystem?: number,
    group?: number,
    children?: ArchiveGroup[],
    image?: string,
}

export interface Archive {
    id?: number,
    name: string | null,
    master: number,
    subsystem: number,
    group: number,
    archive_type: number,
    file_format: number | null,
    document: number | null,
    page: number | null,
    insert_date: string | null,
    update_date: string | null,
    delete_date: string | null,
    user?: number | null,
    delete: boolean,
    panorama: boolean,
    business: number | null,
    business_unit: number | null,
    arse: number | null,
    building: number | null,
    apartment: number | null,
    version: number | null,
    src: string | null,
    thumb_src?: string | null,
    description: string | null,
    file?: any,
    group_name?: string


}

export interface ArseLog{
    id:number,
    arse_log_image:{image:string}[],
    user:{user_type:string,info:usersObject},
    status:ArseStatusEnums,
    explanation:string,
    created_at:string,
    arse:number
}

export interface InitArseStatus{
    previous_log:ArseLog[],
    current_user:{user_type:string,info:usersObject},
}