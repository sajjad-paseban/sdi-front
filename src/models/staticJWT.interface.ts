export interface StaticJWTInterface {
    id?:number
    user:number
    is_active:boolean
    start_time:number
    expire:number
    max_request_per_min?:number
}

export interface TableStaticJWTInterface {
    id?:number
    user:string
    is_active:boolean
    access_token:string
    start_time:string
    expire:string
    max_request_per_min?:number
}

export interface GetKeyById {
    id?:number
    user:number
    is_active:boolean
    date:(string)[]
    max_request_per_min?:number
}

export interface MassageStaticJWT{
    massage:string
}
