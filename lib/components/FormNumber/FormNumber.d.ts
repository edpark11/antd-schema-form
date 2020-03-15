import { PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { NumberItem } from '../../types';
/**
 * 当类型为number和integer时的组件渲染
 * json schema的属性包括：id, type, title, description, minimum, maximum, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, enumMessage, requiredMessage, minimumMessage、
 *   maximumMessage, options, defaultValue
 */
interface FormNumberProps {
    root: NumberItem;
    required: boolean;
}
declare function FormNumber(props: PropsWithChildren<FormNumberProps>): ReactElement | null;
declare namespace FormNumber {
    var propTypes: {
        root: PropTypes.Requireable<object>;
        required: PropTypes.Requireable<boolean>;
    };
}
export default FormNumber;
