"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item: 对象
 */
function getKeysFromObject(item) {
    var idArr = [];
    if (item.type === 'object') {
        for (var key in item.properties) {
            var objIdArr = getKeysFromObject(item.properties[key]);
            idArr.push.apply(idArr, objIdArr);
        }
        // 获取oneOf内的id
        if (item.oneOf && item.oneOf.length > 0) {
            for (var _i = 0, _a = item.oneOf; _i < _a.length; _i++) {
                var oneOfItem = _a[_i];
                for (var key in oneOfItem.properties) {
                    var objIdArr = getKeysFromObject(oneOfItem.properties[key]);
                    objIdArr.forEach(function (objIdArrItem, index, array) {
                        if (!idArr.includes(objIdArrItem))
                            idArr.push(objIdArrItem);
                    });
                }
            }
        }
    }
    else {
        var id = item.id;
        idArr.push(id);
        // 获取oneOf内的id
        if (item.oneOf && item.oneOf.length > 0) {
            for (var _b = 0, _c = item.oneOf; _b < _c.length; _b++) {
                var oneOfItem = _c[_b];
                var id_1 = oneOfItem.id;
                if (id_1 && !idArr.includes(id_1))
                    idArr.push(id_1);
            }
        }
    }
    return idArr;
}
exports.default = getKeysFromObject;
