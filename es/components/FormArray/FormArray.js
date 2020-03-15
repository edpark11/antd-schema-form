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
    const context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    const { form, customComponent, languagePack } = context;
    const { root, required } = props;
    const { id, title, description, $componentType, $defaultValue, $hidden, $formItemProps } = root;
    const rules = createArrayRules(languagePack, root, required);
    let isTableComponent = false; // 判断是否为table组件
    let element = null;
    if (customComponent) {
        if ($componentType && $componentType in customComponent) {
            element = customComponent[$componentType](root, form, required);
        }
        else {
            element = createElement(customComponent.defaultArray, [root, form, required]);
            isTableComponent = true;
        }
    }
    let classname = classNames({
        [styleName('array-table-form-item')]: isTableComponent,
        [styleName('hidden')]: $hidden
    });
    if ($formItemProps && $formItemProps.className) {
        classname = classNames(classname, $formItemProps.className);
    }
    return element ? (React.createElement(Form.Item, Object.assign({ className: classname, name: id, rules: rules, label: title }, omit($formItemProps, ['className'])), element)) : null;
}
FormArray.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormArray;
