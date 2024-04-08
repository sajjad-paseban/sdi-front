export interface DataBaseInterface {
    id?: number
    topic: string
    db_name: string
    host: string
    port: string
    user_name: string
    password: string
    schema?: string | null
    type: string
}


export interface MassageConnection {
    massage: string
}

export interface ServiceInterface {
    id?: number
    topic: string
    version: string
    apiKey?: string | null
    address: string
    wfs_address: string | null
    user_name?: string | null
    password?: string | null
    type: string,
    layers: string,
    styles: string | null,
    format_option: string | null,
    crs: string,
    geo_field_name: string
}

export enum ApiResType {
    ArrayJSON = 'ArrayJSON',
    HTML = 'HTML'
}

export interface ExternalApiInterface {
    id?: number
    topic: string
    method: string
    depend_api?: number | null
    address: string
    description?: string | null
    headers: ExternalApi_params[]
    params: ExternalApi_params[]
    resType:ApiResType
}

export interface ExternalApi_params {
    api?: number
    name: string
    requirement: boolean
    fixed_value: boolean
    value?: string | null
}

export interface TableField {
    column_name: string,
    is_nullable: string,
    data_type: string
}

export interface AnyObject {
    [key: string]: any;
}

