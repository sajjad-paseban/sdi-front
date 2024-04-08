import {z} from "zod";

import {TreeAccess} from "@/models/Access.interface";

import {getAccessTreeValidator} from "@/api/access/validations/getAccessTree.vd";

type getAccessTreeValidatorGdModel = z.infer<typeof getAccessTreeValidator>;

export function getAccessTreeTransformer(inputValidated: getAccessTreeValidatorGdModel): TreeAccess [] {


    const result: TreeAccess[] = addSelectToItems(inputValidated)


    console.log(result, 'transport result')
    return result

}

function addSelectToItems(items: getAccessTreeValidatorGdModel): TreeAccess[] {

    const result: TreeAccess[] = []
    items.forEach((item) => {

        let childRes: TreeAccess[]|null = null

        if (item.children) {
            childRes = addSelectToItems(item.children)
        }

        result.push({...item, selected: [], children: childRes})
    })
    return result
}