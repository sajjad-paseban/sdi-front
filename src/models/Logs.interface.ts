export interface LogsInterface {
    row_number:number
    created_at:string
    ip:string
    user:string|null
    os:string
    description:string
    browser:string
    method:string
    is_response:boolean
    has_file:boolean
    has_error:boolean
}


export interface LoggedUserInterface {
    row_number:number
    fixed_token:string
    created_at:string
    ip:string
    user:string|null
    os:string
    expire:string
    device_model:string
    browser:string
    is_active:boolean
}

export interface MassageLogs{
    massage:string
}