import { PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { BooleanItem } from '../../types';
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
declare function FormBoolean(props: PropsWithChildren<FormBooleanProps>): ReactElement | null;
declare namespace FormBoolean {
    var propTypes: {
        root: PropTypes.Requireable<object>;
    };
}
export default FormBoolean;
