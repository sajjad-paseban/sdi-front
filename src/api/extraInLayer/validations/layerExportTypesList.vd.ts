import {z} from "zod";


export const layerExportTypesListValidator = z.array(z.string())