import { PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { ArrayItem } from '../../types';
/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：id, type, title, description, items, minItems, maxItems
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options, addDataInReverseOrder
 */
interface FormArrayProps {
    root: ArrayItem;
    required: boolean;
}
declare function FormArray(props: PropsWithChildren<FormArrayProps>): ReactElement | null;
declare namespace FormArray {
    var propTypes: {
        root: PropTypes.Requireable<object>;
        required: PropTypes.Requireable<boolean>;
    };
}
export default FormArray;
