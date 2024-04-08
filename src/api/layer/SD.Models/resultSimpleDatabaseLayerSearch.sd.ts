export interface resultSimpleDatabaseLayerSearchSd {
    fields: {
        id: number,
        name: string,
        condition: string
        value1: string
        value2: string
    }[],
    table_name:string
    database_id :number
}