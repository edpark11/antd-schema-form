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
import createStringRules from './createStringRules';
import createElement from '../../utils/createElement';
function FormString(props) {
    var context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent, languagePack = context.languagePack;
    var root = props.root, required = props.required; // type=object时，会判断key是否存在于required数组中
    var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $hidden = root.$hidden, $formItemProps = root.$formItemProps;
    var rules = createStringRules(languagePack, root, required);
    var element = null;
    if (customComponent) {
        element = ($componentType && $componentType in customComponent)
            ? customComponent[$componentType](root, form, required)
            : createElement(customComponent.defaultString, [root, form, required]);
    }
    return element ? (React.createElement(Form.Item, __assign({ className: classNames($hidden ? styleName('hidden') : undefined, $formItemProps === null || $formItemProps === void 0 ? void 0 : $formItemProps.className), name: id, rules: rules, label: title }, omit($formItemProps, ['className'])), element)) : null;
}
FormString.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormString;
