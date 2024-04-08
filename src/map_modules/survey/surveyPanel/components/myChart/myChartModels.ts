export interface ChartInputDataItem {
    [keys: string]: any
}

export interface ChartLabelInput {
    name: string,
    objectName: string
}

export interface MyChartRefInterface {
    showDialog(data: boolean): void;
}

export interface ChartColumn {
    name: string,
    borderColor: string,
    backcolor: string
}
