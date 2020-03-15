import { PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { StringItem } from '../../types';
/**
 * 当类型为string时的组件渲染
 * json schema的属性包括：id, type, title, description, pattern, minLength, maxLength, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, length, patternOption, enumMessage, lengthMessage, requiredMessage,
 *   patternMessage, minLengthMessage, maxLengthMessage, options, defaultValue, placeholder
 */
interface FormStringProps {
    root: StringItem;
    required: boolean;
}
declare function FormString(props: PropsWithChildren<FormStringProps>): ReactElement | null;
declare namespace FormString {
    var propTypes: {
        root: PropTypes.Requireable<object>;
        required: PropTypes.Requireable<boolean>;
    };
}
export default FormString;
