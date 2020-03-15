/* 简单的template模板 */
function template(tpl, data) {
    var result = tpl;
    for (var key in data) {
        var reg = new RegExp("{\\s*" + key + "\\s*}", 'g');
        result = result.replace(reg, "" + data[key]);
    }
    return result;
}
export default template;
