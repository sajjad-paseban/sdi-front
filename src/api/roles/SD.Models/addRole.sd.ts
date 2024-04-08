
export interface AddRoleSDModel {
    name:string,
    role_code:string|null,
    is_admin:boolean,
    is_active:boolean,
    parent:number|null,
}