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
    var context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent;
    var root = props.root, required = props.required;
    var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $hidden = root.$hidden, $formItemProps = root.$formItemProps;
    var element = null;
    if (customComponent) {
        element = ($componentType && $componentType in customComponent)
            ? customComponent[$componentType](root, form, required)
            : createElement(customComponent.defaultBoolean, [root, form, required]);
    }
    return element ? (React.createElement(Form.Item, __assign({ className: classNames($hidden ? styleName('hidden') : undefined, $formItemProps === null || $formItemProps === void 0 ? void 0 : $formItemProps.className), name: id, label: title, valuePropName: "checked" }, omit($formItemProps, ['className'])), element)) : null;
}
FormBoolean.propTypes = {
    root: PropTypes.object
};
export default FormBoolean;
