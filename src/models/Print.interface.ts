export interface InitDataPrintAdd{
    photos:string[],
    groups:TempGroup[],
    temp_sizes:string[],
    heading_temps:PrintTemplate[],
    footer_temps:PrintTemplate[],
    small_temps:PrintTemplate[],
    variables:TempVariable[]

}

export interface TempGroup{
    id:number,
    name:string
}

export interface TempVariable{
    name:string,
    value:string,
    children?:TempVariable[]
}

export interface PrintTemplate{
    id?:number,
    name:string|null,
    print_template_group:number,
    temp_size:string|null,
    small_temp:number | boolean,
    header_temp:number | boolean,
    footer_temp:number | boolean,
    model_variable:string,
    feature_model_layer?:number|null,
    temp_value:string
}