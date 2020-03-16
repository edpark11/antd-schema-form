import { PropsWithChildren, ReactElement, ReactNodeArray } from 'react';
import * as PropTypes from 'prop-types';
import { SchemaItem } from '../../types';
interface OneOfProps {
    root: SchemaItem;
    element: ReactNodeArray;
}
declare function OneOf(props: PropsWithChildren<OneOfProps>): ReactElement | null;
declare namespace OneOf {
    var propTypes: {
        root: PropTypes.Requireable<object>;
        element: PropTypes.Requireable<PropTypes.ReactNodeLike[]>;
    };
}
export default OneOf;
