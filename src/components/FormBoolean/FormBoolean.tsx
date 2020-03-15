import * as React from 'react';
import { useContext, PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'antd';
import classNames from 'classnames';
import omit from 'lodash/omit';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createElement from '../../utils/createElement';
import { ContextValue, BooleanItem } from '../../types';

/**
 * 当类型为boolean时的组件渲染
 * json schema的属性包括：id, type, title, description
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType
 */
interface FormBooleanProps {
  root: BooleanItem;
  required: boolean;
}

function FormBoolean(props: PropsWithChildren<FormBooleanProps>): ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent }: ContextValue = context;
  const { root, required }: FormBooleanProps = props;
  const { id, title, description, $componentType, $hidden, $formItemProps }: BooleanItem = root;
  let element: ReactElement | null = null;

  if (customComponent) {
    element = ($componentType && $componentType in customComponent)
      ? customComponent[$componentType](root, form, required)
      : createElement(customComponent.defaultBoolean, [root, form, required]);
  }

  return element ? (
    <Form.Item className={ classNames($hidden ? styleName('hidden') : undefined, $formItemProps?.className) }
      name={ id }
      label={ title }
      valuePropName="checked"
      { ...omit($formItemProps, ['className']) }
    >
      { element }
    </Form.Item>
  ) : null;
}

FormBoolean.propTypes = {
  root: PropTypes.object
};

export default FormBoolean;