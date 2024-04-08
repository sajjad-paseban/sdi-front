
//T1:تایپ دیتای خروجی مورد نظر ما



import {getAccessValidator} from "@/api/access/validations/getAccesses.vd";
import {z} from "zod";
import {Access} from "@/models/Access.interface";

type getAccessGdModel = z.infer<typeof getAccessValidator >;

export function getAccessTransformer(inputValidated:getAccessGdModel):Access[]{
    const result:Access[] =[]
    inputValidated.forEach((access)=>{
        result.push({...access})
    })

    console.log(result,'transport result')
    return result

}