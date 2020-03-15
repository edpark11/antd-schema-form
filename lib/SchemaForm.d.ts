import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { FormProps } from 'antd/es/form/Form';
import { SchemaItem } from './types';
export interface SchemaFormProps {
    json: SchemaItem;
    value?: any;
    onOk?: Function;
    onCancel?: Function;
    okText?: string | number;
    cancelText?: string | number;
    footer?: Function;
    customComponent?: {
        [key: string]: Function;
    };
    customTableRender?: object;
    languagePack?: object;
    formOptions?: FormProps;
}
declare type SchemaFormComponent = ForwardRefExoticComponent<PropsWithoutRef<SchemaFormProps> & RefAttributes<any>>;
declare const SchemaForm: SchemaFormComponent;
export default SchemaForm;
