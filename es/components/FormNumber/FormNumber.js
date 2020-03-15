import * as React from 'react';
import { useContext } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'antd';
import classNames from 'classnames';
import omit from 'lodash/omit';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';
import createElement from '../../utils/createElement';
function FormNumber(props) {
    const context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    const { form, customComponent, languagePack } = context;
    const { root, required } = props; // type=object时，会判断key是否存在于required数组中
    const { id, type, title, description, $componentType, $hidden, $formItemProps } = root;
    const rules = createNumberRules(languagePack, root, required, type === 'integer');
    let element = null;
    if (customComponent) {
        element = ($componentType && $componentType in customComponent)
            ? customComponent[$componentType](root, form, required)
            : createElement(customComponent.defaultNumber, [root, form, required]);
    }
    return element ? (React.createElement(Form.Item, Object.assign({ className: classNames($hidden ? styleName('hidden') : undefined, $formItemProps === null || $formItemProps === void 0 ? void 0 : $formItemProps.className), name: id, rules: rules, label: title }, omit($formItemProps, ['className'])), element)) : null;
}
FormNumber.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormNumber;
