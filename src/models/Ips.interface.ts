export interface IpsInterface {
    user?:number|null
    is_active:boolean
    ip:string
    os?:string|null
    active_time_start?:number|null
    active_time_end?:number|null
    id?:number
}

export interface TableIpsInterface {
    user?:number|null
    is_active:boolean
    ip:string
    os?:string|null
    active_time_start?:string|null
    active_time_end?:string|null
    id:number
}
export interface GetIpById {
    date:(string|null)[]
    ip:string
    is_active:boolean
    user?:number|null

}

export interface MassageIps{
    massage:string
}