



export interface Access {
    e_name: string,
    f_name: string,
    parent: any
}

export interface Role {
    is_admin: boolean,
    is_active: boolean,
    is_superuser: boolean,
    access: Access[],
    accessRoutes: string[],
    accessApis: string[],

}

export interface UserStates {
    first_name: string,
    last_name: string,
    user_name: string,
    image: string | null,
    is_active: boolean,
    role: Role,
    jwt: {
        access: string,
        expire: number
    }

}