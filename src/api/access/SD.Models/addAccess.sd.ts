import {API_TYPE} from "@/models/Access.interface";

export interface AddAccessApi {
    address:string,
    method:API_TYPE
}

export interface AddAccessSDModel {
    f_name:string,
    e_name:string,
    is_active:boolean,
    apis:string[],
    parent:number|null,
    old_e_name?:string

}