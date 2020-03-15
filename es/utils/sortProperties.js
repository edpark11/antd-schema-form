import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import fromPairs from 'lodash/fromPairs';
/* 对root.properties进行排序 */
function sortProperties(properties) {
    const propertiesArr = (Object.entries || toPairs)(properties);
    const sortPropertiesArr = sortBy(propertiesArr, function (o) {
        var _a;
        return (_a = o[1].$order) !== null && _a !== void 0 ? _a : 0;
    });
    // @ts-ignore
    return (Object.fromEntries || fromPairs)(sortPropertiesArr);
}
export default sortProperties;
