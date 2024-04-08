
import Map from 'ol/Map.js';
export interface RootState{
    router_access_denied_alert :boolean,

    confirmDialog: {
        massage: string|null,
        topic: string|null,
        accept: () => void,
        reject: () => void,
        active: boolean
        yesBtn?:{color:string,text:string}
        noBtn?:{color:string,text:string}
    },

    requestLoading:{
        simple:boolean,
        advance:boolean,
    }

    frontUrl:string
    backendUrl:string
    geoUrl:string
    layerExportLink:string

}