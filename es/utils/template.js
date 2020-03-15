/* 简单的template模板 */
function template(tpl, data) {
    let result = tpl;
    for (const key in data) {
        const reg = new RegExp(`{\\s*${key}\\s*}`, 'g');
        result = result.replace(reg, `${data[key]}`);
    }
    return result;
}
export default template;
