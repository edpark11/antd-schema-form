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
import classNames from 'classnames';
import { Form } from 'antd';
import omit from 'lodash/omit';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
import createElement from '../../utils/createElement';
function FormArray(props) {
    var _a;
    var context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent, languagePack = context.languagePack;
    var root = props.root, required = props.required;
    var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $defaultValue = root.$defaultValue, $hidden = root.$hidden, $formItemProps = root.$formItemProps;
    var rules = createArrayRules(languagePack, root, required);
    var isTableComponent = false; // 判断是否为table组件
    var element = null;
    if (customComponent) {
        if ($componentType && $componentType in customComponent) {
            element = customComponent[$componentType](root, form, required);
        }
        else {
            element = createElement(customComponent.defaultArray, [root, form, required]);
            isTableComponent = true;
        }
    }
    var classname = classNames((_a = {},
        _a[styleName('array-table-form-item')] = isTableComponent,
        _a[styleName('hidden')] = $hidden,
        _a));
    if ($formItemProps && $formItemProps.className) {
        classname = classNames(classname, $formItemProps.className);
    }
    return element ? (React.createElement(Form.Item, __assign({ className: classname, name: id, rules: rules, label: title }, omit($formItemProps, ['className'])), element)) : null;
}
FormArray.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormArray;
