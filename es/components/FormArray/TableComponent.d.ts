import { PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { ArrayItem } from '../../types';
interface TableComponentProps {
    root: ArrayItem;
    id?: string;
    value?: any;
    onChange?: Function;
}
declare function TableComponent(props: PropsWithChildren<TableComponentProps>): ReactElement | null;
declare namespace TableComponent {
    var propTypes: {
        root: PropTypes.Requireable<object>;
    };
}
export default TableComponent;
