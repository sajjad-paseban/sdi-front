export interface RolesWithParentName {
    id:number,
    name:string,
    role_code:string,
    is_admin:boolean,
    is_active:boolean,
    is_superuser:boolean,
    parent:string|null,
}

export interface Role {

    name:string,
    role_code:string|null,
    is_admin:boolean,
    app_user:boolean,
    is_active:boolean,
    parent:number|null,
    id?:number

}

export interface MassageRoles{
    massage:string
}

export interface TreeRole {
    id:number,
    name:string,
    selected:[],
    children:TreeRole[]|null

}