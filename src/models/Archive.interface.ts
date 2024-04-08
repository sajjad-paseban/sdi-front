export interface ArchiveImage {
    id?:number,
    panorama: boolean,
    url: string|null,
    thumb_url?:string|null,
    showCaption: boolean,
    caption: string|null,
    date:string|null
}