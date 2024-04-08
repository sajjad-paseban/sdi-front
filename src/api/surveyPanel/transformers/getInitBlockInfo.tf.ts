import {z} from "zod";
import {initBlockInfo, SurveyPanelUsers, SurveyRegionInfo} from "@/models/SurveyPanel.interface";
import {InitBlockInfoValidator} from "@/api/surveyPanel/validations/getInitBlockInfo.vd";


type getInitBlockInfoList = z.infer<typeof InitBlockInfoValidator>;

export function getInitBlockInfoTransformer(inputValidated: getInitBlockInfoList): initBlockInfo[] {
    const res: initBlockInfo[] = []
    inputValidated.map((item) => {
        const data = item.update_date.split(' ')
        if (data.length>1){
            res.push({...item, update_date:data [0], update_time: data[1]})
        }

    })
    return res
}