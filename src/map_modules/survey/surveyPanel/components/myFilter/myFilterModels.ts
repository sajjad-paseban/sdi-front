export interface KeyModel{
    name:string
    type:string
    f_name:string
    value:any
}

export interface DoFilterResult{
    keys:KeyModel[],
    sortKeyName:string|null,
    sortValue:string|null
}
export interface MyChartRefInterface{
    showDialog(data: boolean): void;
}