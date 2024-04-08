export interface AddUserSd {
    first_name:string
    last_name:string
    user_name:string
    role:number
    password:string
    email:string|null
    phone:string
    connected_device:number
    address:string|null
    image:File|null
    is_active:boolean
    sms_login:boolean
    check_ip:boolean
}