/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item: 对象
 */
function getKeysFromObject(item) {
    const idArr = [];
    if (item.type === 'object') {
        for (const key in item.properties) {
            const objIdArr = getKeysFromObject(item.properties[key]);
            idArr.push(...objIdArr);
        }
        // 获取oneOf内的id
        if (item.oneOf && item.oneOf.length > 0) {
            for (const oneOfItem of item.oneOf) {
                for (const key in oneOfItem.properties) {
                    const objIdArr = getKeysFromObject(oneOfItem.properties[key]);
                    objIdArr.forEach((objIdArrItem, index, array) => {
                        if (!idArr.includes(objIdArrItem))
                            idArr.push(objIdArrItem);
                    });
                }
            }
        }
    }
    else {
        const id = item.id;
        idArr.push(id);
        // 获取oneOf内的id
        if (item.oneOf && item.oneOf.length > 0) {
            for (const oneOfItem of item.oneOf) {
                const id = oneOfItem.id;
                if (id && !idArr.includes(id))
                    idArr.push(id);
            }
        }
    }
    return idArr;
}
export default getKeysFromObject;
