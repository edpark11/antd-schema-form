import * as React from 'react';
import { Select } from 'antd';
/* 渲染select的下拉框 */
function selectOptionsRender(options) {
    return options.map((item, index) => {
        return React.createElement(Select.Option, { key: `${index}`, value: item.value }, item.label);
    });
}
export default selectOptionsRender;
