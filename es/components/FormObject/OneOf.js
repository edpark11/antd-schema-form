import * as React from 'react';
import { Fragment, useState, useEffect, useContext } from 'react';
import * as PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import { Radio } from 'antd';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
function OneOf(props) {
    const context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    const { form } = context;
    const { element, root } = props;
    const { id, oneOf, $oneOfDisabled, $oneOfIndex } = root;
    // oneOf选项卡的index
    const [index, setIndex] = useState(($oneOfIndex !== undefined && isNumber($oneOfIndex)) ? $oneOfIndex : 0);
    // 切换的callback
    function switchCallback(newIndex, oldIndex) {
        // 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
        // This case is type="string", the next control is date, because of the relationship of the moment,
        // so to clear the value of the component, it is best to avoid this situation
        if (oneOf
            && oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string' // 新旧组件都为string
            && ((oneOf[oldIndex].$componentType !== 'date' && oneOf[newIndex].$componentType === 'date') // 判断是否为date组件
                || (oneOf[oldIndex].$componentType === 'date' && oneOf[newIndex].$componentType !== 'date'))) {
            form.resetFields([id]);
        }
        setIndex(newIndex);
    }
    // 切换指定index
    function handleDesignationIndexChange(event) {
        const value = event.target.value;
        if (typeof value === 'number') {
            switchCallback(value, index);
        }
    }
    useEffect(function () {
        setIndex(($oneOfIndex !== undefined && isNumber($oneOfIndex)) ? $oneOfIndex : 0);
    }, [root]);
    // 渲染radio
    function radioGroupView() {
        const options = [];
        const of = oneOf || [];
        for (let i = 0, j = of.length; i < j; i++) {
            const item = of[i];
            options.push({ label: item.title, value: i });
        }
        return (React.createElement(Radio.Group, { key: "radio-group", size: "small", options: options, value: index, onChange: $oneOfDisabled ? undefined : handleDesignationIndexChange }));
    }
    return (React.createElement(Fragment, null,
        React.createElement("div", { className: styleName('object-radio-group') }, radioGroupView()),
        element[index]));
}
OneOf.propTypes = {
    root: PropTypes.object,
    element: PropTypes.arrayOf(PropTypes.node)
};
export default OneOf;
