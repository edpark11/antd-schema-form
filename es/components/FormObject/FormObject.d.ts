import { PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { SchemaItem } from '../../types';
/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：id, type, title, description, properties, required
 */
interface FormObjectProps {
    root: SchemaItem;
    onOk?: Function;
    onCancel?: Function;
    okText?: string | number;
    cancelText?: string | number;
    footer?: Function;
}
declare function FormObject(props: PropsWithChildren<FormObjectProps>): ReactElement | null;
declare namespace FormObject {
    var propTypes: {
        root: PropTypes.Requireable<object>;
        onOk: PropTypes.Requireable<(...args: any[]) => any>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        okText: PropTypes.Requireable<string | number>;
        cancelText: PropTypes.Requireable<string | number>;
        footer: PropTypes.Requireable<(...args: any[]) => any>;
    };
}
export default FormObject;
