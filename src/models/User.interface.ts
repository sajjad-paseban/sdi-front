export interface UserInterface {
    first_name:string
    last_name:string
    user_name:string
    role:number
    password:string
    email:string|null
    phone:string
    connected_device:number
    address:string|null
    image:string|null
    is_active:boolean
    sms_login:boolean
    check_ip:boolean
    id?:number
    national_code?:number|null
    state?:string|null
    city?:string|null
}

export interface MassageUsers{
    massage:string
}

export interface usersObject {
    first_name:string
    last_name:string
    user_name:string
    is_active:boolean
    phone:string
    role:string
    id:number,
    image?:string|null
}