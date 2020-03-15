var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as moment from 'moment';
/**
 * 从schema里面提取出$defaultValue
 * @param { SchemaJson } schemaJsonItem: 对象
 * @param { string } id: 可能不存在id，使用上一个对象的id
 */
function getObjectFromSchema(schemaJsonItem, id) {
    var value = {};
    if (schemaJsonItem.type === 'object') {
        for (var key in schemaJsonItem.properties) {
            value = __assign(__assign({}, value), getObjectFromSchema(schemaJsonItem.properties[key]));
        }
    }
    else if (schemaJsonItem.oneOf && schemaJsonItem.oneOf.length > 0) {
        var index = (('$oneOfIndex' in schemaJsonItem) && typeof schemaJsonItem.$oneOfIndex === 'number')
            ? schemaJsonItem.$oneOfIndex
            : 0;
        value = __assign(__assign({}, value), getObjectFromSchema(schemaJsonItem.oneOf[index]));
    }
    else if ('$defaultValue' in schemaJsonItem) {
        if (schemaJsonItem.$defaultValue
            && schemaJsonItem.type === 'string'
            && schemaJsonItem.$componentType === 'date'
            && schemaJsonItem.$defaultValue['_isAMomentObject'] !== true) {
            // @ts-ignore
            value[schemaJsonItem.id || id] = moment(schemaJsonItem.$defaultValue);
        }
        else {
            // @ts-ignore
            value[schemaJsonItem.id || id] = schemaJsonItem.$defaultValue;
        }
    }
    return value;
}
export default getObjectFromSchema;
