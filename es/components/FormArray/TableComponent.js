import * as React from 'react';
import { Fragment, useState, useEffect, useContext, useRef } from 'react';
import * as PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import classNames from 'classnames';
import { Table, Button, Popconfirm, Drawer, Input } from 'antd';
import { PlusCircleOutlined as IconPlusCircleOutlined, DeleteOutlined as IconDeleteOutlined } from '@ant-design/icons';
import update from 'immutability-helper';
import AntdSchemaFormContext from '../../context';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import { formatTableValue, sortIndex } from './tableFunction';
import FormObject from '../FormObject/FormObject';
import styleName from '../../utils/styleName';
import template from '../../utils/template';
// 拖拽相关变量
const tableDragClassName = [
    styleName('array-drop-over-downward'),
    styleName('array-drop-over-upward')
];
/* 表格的className */
function tableClassName(hasErr) {
    return classNames(styleName('array-table-component'), {
        [styleName('array-table-component-has-error')]: hasErr
    });
}
function TableComponent(props) {
    const context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    const { form, languagePack, customTableRender } = context;
    const { root } = props;
    const { id, items, minItems, maxItems, $minItemsMessage, $maxItemsMessage } = root;
    const { type, properties, title, $tableRender } = items;
    const changeIndexRef = useRef(null);
    let dragTargetId = undefined; // 被拖拽的id
    let dragTargetIndex = undefined; // 被拖拽的index
    // 添加和修改数据的抽屉的显示和隐藏
    const [isDisplayDataDrawer, setIsDisplayDataDrawer] = useState(false);
    // 编辑框修改位置的状态
    const [inputDisplayIndex, setInputDisplayIndex] = useState(undefined);
    // 编辑框的值
    const [inputChangeIndex, setInputChangeIndex] = useState(undefined);
    // 多选框
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 当前表格编辑的对象
    const [editIndex, setEditIndex] = useState(undefined);
    // 表单
    function triggerChange(changedValue) {
        if (props.onChange) {
            props.onChange(changedValue);
        }
    }
    // 调换位置
    function moveRow(dragIndex, hoverIndex) {
        let tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        const dragRowItem = tableValue[dragIndex];
        const newData = update({ tableValue }, {
            tableValue: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowItem]]
            }
        });
        triggerChange(newData.tableValue);
    }
    // 开始拖拽
    function handleTableDragStart(event) {
        const target = event.target;
        const id = target['dataset'].id;
        const index = Number(target['dataset'].index);
        dragTargetId = id;
        dragTargetIndex = index;
    }
    // 拖拽进入
    function handleTableDragEnter(event) {
        event.preventDefault();
        // 获取目标的信息
        const target = event.target;
        let fatherTarget = undefined;
        // 获取父级节点
        if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode'];
        }
        else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode']['parentNode'];
        }
        if (fatherTarget !== undefined) {
            const overId = fatherTarget['dataset'].id;
            const overIndex = Number(fatherTarget['dataset'].index);
            // 添加样式
            if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
                if (overIndex > dragTargetIndex) {
                    fatherTarget.classList.add(tableDragClassName[0]);
                }
                else if (overIndex < dragTargetIndex) {
                    fatherTarget.classList.add(tableDragClassName[1]);
                }
            }
        }
    }
    // 拖拽退出
    function handleTableDragLeave(event) {
        event.preventDefault();
        // 获取目标的信息
        const target = event['target'];
        let fatherTarget = undefined;
        // 获取父级节点
        if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode'];
        }
        else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode']['parentNode'];
        }
        if (fatherTarget !== undefined) {
            const overId = fatherTarget['dataset'].id;
            // 移除样式
            if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
                fatherTarget.classList.remove(tableDragClassName[0]);
                fatherTarget.classList.remove(tableDragClassName[1]);
            }
        }
    }
    // 拖拽中
    function handleTableDragOver(event) {
        event.preventDefault();
    }
    // 放置
    function handleTableDrop(event) {
        event.preventDefault();
        // 获取目标的信息
        const target = event['target'];
        let fatherTarget = undefined;
        // 获取父级节点
        if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode'];
        }
        else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode']['parentNode'];
        }
        if (fatherTarget !== undefined) {
            const overId = fatherTarget['dataset'].id;
            const overIndex = Number(fatherTarget['dataset'].index);
            // 修改数据
            if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
                moveRow(dragTargetIndex, overIndex);
            }
        }
        // 重置拖拽状态
        dragTargetId = undefined;
        dragTargetIndex = undefined;
        // 清除样式
        const c0 = document.querySelector(`.${tableDragClassName[0]}`);
        const c1 = document.querySelector(`.${tableDragClassName[1]}`);
        c0 && c0.classList.remove(tableDragClassName[0]);
        c1 && c1.classList.remove(tableDragClassName[1]);
    }
    // table components
    const components = {
        body: {
            row: (item) => {
                var _a, _b;
                const { children, className } = item;
                // @ts-ignore
                const index = (_b = (_a = children[0]) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.index;
                return (React.createElement("tr", { className: className, draggable: true, "data-id": id, "data-index": index, onDragStart: handleTableDragStart, onDragEnter: handleTableDragEnter, onDragLeave: handleTableDragLeave, onDragOver: handleTableDragOver, onDrop: handleTableDrop }, children));
            }
        }
    };
    // 编辑位置框修改位置
    function handleInputDisplayClick(index, event) {
        setInputDisplayIndex(index);
        setInputChangeIndex(String(index + 1));
    }
    // 编辑位置框数据修改
    function handleIndexInputChange(event) {
        setInputChangeIndex(event.target.value);
    }
    // 编辑位置框失去焦点
    function handleIndexInputBlur(index, event) {
        let tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        const length = tableValue.length;
        let newIndex = Number(inputChangeIndex) - 1;
        if (inputChangeIndex && newIndex !== index && /^[0-9]+$/.test(inputChangeIndex)) {
            if (newIndex < 0)
                newIndex = 0;
            if (newIndex > length)
                newIndex = length;
            moveRow(index, newIndex);
        }
        setInputDisplayIndex(undefined);
        setInputChangeIndex(undefined);
    }
    // 添加和修改数据
    function handleAddOrEditDataClick(objectForm, objectValue, keys) {
        // 获取需要验证和获取值的key
        const value = form.getFieldsValue(keys);
        const formatValue = formatValueBeforeGetValue(value, id);
        const result = getValueFromObject(formatValue);
        let tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        // 判断是修改还是添加
        if (editIndex === undefined) {
            tableValue[root.$addDataInReverseOrder ? 'unshift' : 'push'](result['items']);
        }
        else {
            tableValue[editIndex] = result['items'];
        }
        triggerChange(tableValue);
        // 重置状态
        if (editIndex === undefined) {
            form.resetFields(keys);
        }
        else {
            setIsDisplayDataDrawer(false);
            setEditIndex(undefined);
        }
    }
    // 删除数据
    function handleDeleteDataClick(index, event) {
        let tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        tableValue.splice(index, 1);
        triggerChange(tableValue);
    }
    // 修改数据抽屉的显示
    function handleDrawEditDataDisplayClick(index, event) {
        setIsDisplayDataDrawer(true);
        setEditIndex(index);
    }
    // 抽屉的显示和隐藏
    function handleDrawerDisplayClick(value, event) {
        setIsDisplayDataDrawer(value);
        if (!value)
            setEditIndex(undefined);
    }
    // 表格的单选和多选
    function handleColumnCheckboxChange(selectedRowKeys, selectedRows) {
        setSelectedRowKeys(selectedRowKeys);
    }
    // 删除选中的数据
    function handleDeleteSelectDataClick(event) {
        const id = root.id;
        let tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        // 删除选中的数据
        const sortSelectedRowKeys = sortIndex(selectedRowKeys);
        for (const item of sortSelectedRowKeys)
            tableValue.splice(item, 1);
        triggerChange(tableValue);
        setSelectedRowKeys([]);
    }
    // columns
    function columns() {
        const columnArr = [];
        // 渲染调整数组位置的编辑框
        columnArr.push({
            title: '',
            key: 'lineNumber',
            align: 'center',
            width: 65,
            render: (value, record, index) => {
                if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
                    return (React.createElement("a", { onClick: (event) => handleInputDisplayClick(index, event) }, index + 1));
                }
                else {
                    return (React.createElement(Input, { ref: changeIndexRef, value: inputChangeIndex, onChange: handleIndexInputChange, onBlur: (event) => handleIndexInputBlur(index, event), onPressEnter: (event) => handleIndexInputBlur(index, event) }));
                }
            }
        });
        // 渲染函数
        const renderCallback = (value, record, index) => {
            if (isBoolean(value)) {
                return String(value);
            }
            else if (isObject(value)) {
                return Object.prototype.toString.call(value);
            }
            else {
                return value;
            }
        };
        // 渲染自定义render
        const createRenderCallback = (renderItem, customFunc) => {
            return (value, record, index) => {
                return customFunc(value, record, index, renderItem, form);
            };
        };
        if (type === 'object') {
            for (const key in properties) {
                const propItem = properties[key];
                // 隐藏列
                if (!propItem.$tableColumnHidden) {
                    columnArr.push({
                        title: propItem.title,
                        key,
                        dataIndex: key,
                        render: (propItem.$tableRender && customTableRender && (propItem.$tableRender in customTableRender))
                            ? createRenderCallback(propItem, customTableRender[propItem.$tableRender])
                            : renderCallback
                    });
                }
            }
        }
        else {
            columnArr.push({
                title,
                key: 'value',
                dataIndex: 'value',
                render: ($tableRender && customTableRender && ($tableRender in customTableRender))
                    ? createRenderCallback(items, customTableRender[$tableRender])
                    : renderCallback
            });
        }
        columnArr.push({
            title: languagePack && languagePack.formArray.operating,
            key: 'handle',
            width: 160,
            render: (value, record, index) => {
                return (React.createElement(Button.Group, null,
                    React.createElement(Button, { onClick: (event) => handleDrawEditDataDisplayClick(index, event) }, languagePack.formArray.operatingEdit),
                    React.createElement(Popconfirm, { title: languagePack.formArray.operatingPopconfirmTitle, onConfirm: (event) => handleDeleteDataClick(index, event) },
                        React.createElement(Button, { type: "primary", danger: true }, languagePack.formArray.operatingDelete))));
            }
        });
        return columnArr;
    }
    useEffect(function () {
        // 编辑位置框需要给一个焦点
        if (changeIndexRef.current) {
            changeIndexRef.current.focus();
        }
    }, [inputDisplayIndex, inputChangeIndex]);
    useEffect(function () {
        // 打开抽屉时需要赋值
        // eslint-disable-next-line @typescript-eslint/tslint/config
        if (editIndex !== undefined) {
            let tableValue = form.getFieldValue(id);
            tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
            const itemValue = tableValue[editIndex];
            const result = getObjectFromValue({ items: itemValue }, id);
            form.setFieldsValue(result);
        }
    }, [isDisplayDataDrawer, editIndex]);
    const inputNotDisplay = isNil(inputDisplayIndex);
    let value = form.getFieldValue(id);
    value = isNil(value) ? [] : value;
    // 对数组内的元素数量进行验证
    let arrayRulesVerificationResult = undefined;
    if (minItems !== undefined && value.length < minItems) {
        arrayRulesVerificationResult = template($minItemsMessage || languagePack.rules.array.minItems, {
            '0': minItems
        });
    }
    if (maxItems !== undefined && value.length > maxItems) {
        arrayRulesVerificationResult = template($maxItemsMessage || languagePack.rules.array.maxItems, {
            '0': maxItems
        });
    }
    return (React.createElement(Fragment, null,
        React.createElement(Table, { className: tableClassName(arrayRulesVerificationResult !== undefined), size: "middle", dataSource: items.type === 'object' ? value : formatTableValue(value), columns: columns(), bordered: true, title: () => [
                React.createElement(Button, { key: "add", type: "primary", icon: React.createElement(IconPlusCircleOutlined, null), onClick: (event) => handleDrawerDisplayClick(true, event) }, languagePack.formArray.operatingAdd),
                React.createElement(Popconfirm, { key: "delete", title: languagePack.formArray.deleteSelectedText, onConfirm: (event) => handleDeleteSelectDataClick(event) },
                    React.createElement(Button, { className: styleName('array-deleteAll'), type: "primary", danger: true, icon: React.createElement(IconDeleteOutlined, null) }, languagePack.formArray.deleteSelected))
            ], rowKey: (item, index) => `${index}`, rowSelection: {
                type: 'checkbox',
                selectedRowKeys,
                onChange: handleColumnCheckboxChange
            }, components: inputNotDisplay ? components : undefined, pagination: false }),
        React.createElement("p", { className: styleName('array-table-rules-verification-str') }, arrayRulesVerificationResult),
        React.createElement(Drawer, { width: "100%", visible: isDisplayDataDrawer, destroyOnClose: true, closable: false },
            React.createElement(FormObject, { root: items, 
                // eslint-disable-next-line @typescript-eslint/tslint/config
                okText: editIndex !== undefined ? undefined : languagePack.formObject.addOkText, 
                // eslint-disable-next-line @typescript-eslint/tslint/config
                cancelText: editIndex !== undefined ? undefined : languagePack.formObject.addCancelText, onOk: handleAddOrEditDataClick, onCancel: () => handleDrawerDisplayClick(false) }))));
}
TableComponent.propTypes = {
    root: PropTypes.object
};
export default TableComponent;
