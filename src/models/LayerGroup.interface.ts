export interface LayerGroupInterface {
    name: string,
    parent: number | null,
    id?: number,
    print_template_group?:{
        id: number,
        name: string,
    }
}

export interface LayerGroup{
    id: number

}