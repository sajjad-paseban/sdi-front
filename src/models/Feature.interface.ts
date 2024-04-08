export interface Field {
    id: number,
    OName:string,
    name: string
    value: any
    type: string
    is_required: boolean
    layer_field_choices: string[] | null
}