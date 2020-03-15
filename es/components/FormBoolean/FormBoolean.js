import * as React from 'react';
import { useContext } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'antd';
import classNames from 'classnames';
import omit from 'lodash/omit';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createElement from '../../utils/createElement';
function FormBoolean(props) {
    const context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    const { form, customComponent } = context;
    const { root, required } = props;
    const { id, title, description, $componentType, $hidden, $formItemProps } = root;
    let element = null;
    if (customComponent) {
        element = ($componentType && $componentType in customComponent)
            ? customComponent[$componentType](root, form, required)
            : createElement(customComponent.defaultBoolean, [root, form, required]);
    }
    return element ? (React.createElement(Form.Item, Object.assign({ className: classNames($hidden ? styleName('hidden') : undefined, $formItemProps === null || $formItemProps === void 0 ? void 0 : $formItemProps.className), name: id, label: title, valuePropName: "checked" }, omit($formItemProps, ['className'])), element)) : null;
}
FormBoolean.propTypes = {
    root: PropTypes.object
};
export default FormBoolean;
