export enum API_TYPE {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'

}

export interface Access {
    f_name: string,
    e_name: string,
    api: string | null | undefined,
    api_type: API_TYPE|null,
    is_active: boolean,
    parent: number|null

}

export interface AccessWithParentName {
    f_name: string,
    e_name: string,
    api: string | null | undefined,
    api_type: API_TYPE|null,
    is_active: boolean,
    parent: string|null

}

export interface MyApi {
    text: string,
    id: number

}

export interface TreeAccess {
    id:number,
    e_name:string,
    selected:[],
    children:TreeAccess[]|null

}

export interface MassageAccess{
    massage:string
}

export interface AccessLayerTree {
    id: number,
    name: string,
    image: string | null
    is_service?: boolean
    children?: AccessLayerTree[] | null
    layer_access?:{
        id:number|null,
        show:boolean|null,
        active_layer:boolean|null,
        edit:boolean|null,
        delete:boolean|null
    }

}