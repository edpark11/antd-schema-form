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
var tableDragClassName = [
    styleName('array-drop-over-downward'),
    styleName('array-drop-over-upward')
];
/* 表格的className */
function tableClassName(hasErr) {
    var _a;
    return classNames(styleName('array-table-component'), (_a = {},
        _a[styleName('array-table-component-has-error')] = hasErr,
        _a));
}
function TableComponent(props) {
    var context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, languagePack = context.languagePack, customTableRender = context.customTableRender;
    var root = props.root;
    var id = root.id, items = root.items, minItems = root.minItems, maxItems = root.maxItems, $minItemsMessage = root.$minItemsMessage, $maxItemsMessage = root.$maxItemsMessage;
    var type = items.type, properties = items.properties, title = items.title, $tableRender = items.$tableRender;
    var changeIndexRef = useRef(null);
    var dragTargetId = undefined; // 被拖拽的id
    var dragTargetIndex = undefined; // 被拖拽的index
    // 添加和修改数据的抽屉的显示和隐藏
    var _a = useState(false), isDisplayDataDrawer = _a[0], setIsDisplayDataDrawer = _a[1];
    // 编辑框修改位置的状态
    var _b = useState(undefined), inputDisplayIndex = _b[0], setInputDisplayIndex = _b[1];
    // 编辑框的值
    var _c = useState(undefined), inputChangeIndex = _c[0], setInputChangeIndex = _c[1];
    // 多选框
    var _d = useState([]), selectedRowKeys = _d[0], setSelectedRowKeys = _d[1];
    // 当前表格编辑的对象
    var _e = useState(undefined), editIndex = _e[0], setEditIndex = _e[1];
    // 表单
    function triggerChange(changedValue) {
        if (props.onChange) {
            props.onChange(changedValue);
        }
    }
    // 调换位置
    function moveRow(dragIndex, hoverIndex) {
        var tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        var dragRowItem = tableValue[dragIndex];
        var newData = update({ tableValue: tableValue }, {
            tableValue: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowItem]]
            }
        });
        triggerChange(newData.tableValue);
    }
    // 开始拖拽
    function handleTableDragStart(event) {
        var target = event.target;
        var id = target['dataset'].id;
        var index = Number(target['dataset'].index);
        dragTargetId = id;
        dragTargetIndex = index;
    }
    // 拖拽进入
    function handleTableDragEnter(event) {
        event.preventDefault();
        // 获取目标的信息
        var target = event.target;
        var fatherTarget = undefined;
        // 获取父级节点
        if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode'];
        }
        else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode']['parentNode'];
        }
        if (fatherTarget !== undefined) {
            var overId = fatherTarget['dataset'].id;
            var overIndex = Number(fatherTarget['dataset'].index);
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
        var target = event['target'];
        var fatherTarget = undefined;
        // 获取父级节点
        if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode'];
        }
        else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode']['parentNode'];
        }
        if (fatherTarget !== undefined) {
            var overId = fatherTarget['dataset'].id;
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
        var target = event['target'];
        var fatherTarget = undefined;
        // 获取父级节点
        if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode'];
        }
        else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
            fatherTarget = target['parentNode']['parentNode'];
        }
        if (fatherTarget !== undefined) {
            var overId = fatherTarget['dataset'].id;
            var overIndex = Number(fatherTarget['dataset'].index);
            // 修改数据
            if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
                moveRow(dragTargetIndex, overIndex);
            }
        }
        // 重置拖拽状态
        dragTargetId = undefined;
        dragTargetIndex = undefined;
        // 清除样式
        var c0 = document.querySelector("." + tableDragClassName[0]);
        var c1 = document.querySelector("." + tableDragClassName[1]);
        c0 && c0.classList.remove(tableDragClassName[0]);
        c1 && c1.classList.remove(tableDragClassName[1]);
    }
    // table components
    var components = {
        body: {
            row: function (item) {
                var _a, _b;
                var children = item.children, className = item.className;
                // @ts-ignore
                var index = (_b = (_a = children[0]) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.index;
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
        var tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        var length = tableValue.length;
        var newIndex = Number(inputChangeIndex) - 1;
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
        var value = form.getFieldsValue(keys);
        var formatValue = formatValueBeforeGetValue(value, id);
        var result = getValueFromObject(formatValue);
        var tableValue = form.getFieldValue(id);
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
        var tableValue = form.getFieldValue(id);
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
        var id = root.id;
        var tableValue = form.getFieldValue(id);
        tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
        // 删除选中的数据
        var sortSelectedRowKeys = sortIndex(selectedRowKeys);
        for (var _i = 0, sortSelectedRowKeys_1 = sortSelectedRowKeys; _i < sortSelectedRowKeys_1.length; _i++) {
            var item = sortSelectedRowKeys_1[_i];
            tableValue.splice(item, 1);
        }
        triggerChange(tableValue);
        setSelectedRowKeys([]);
    }
    // columns
    function columns() {
        var columnArr = [];
        // 渲染调整数组位置的编辑框
        columnArr.push({
            title: '',
            key: 'lineNumber',
            align: 'center',
            width: 65,
            render: function (value, record, index) {
                if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
                    return (React.createElement("a", { onClick: function (event) { return handleInputDisplayClick(index, event); } }, index + 1));
                }
                else {
                    return (React.createElement(Input, { ref: changeIndexRef, value: inputChangeIndex, onChange: handleIndexInputChange, onBlur: function (event) { return handleIndexInputBlur(index, event); }, onPressEnter: function (event) { return handleIndexInputBlur(index, event); } }));
                }
            }
        });
        // 渲染函数
        var renderCallback = function (value, record, index) {
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
        var createRenderCallback = function (renderItem, customFunc) {
            return function (value, record, index) {
                return customFunc(value, record, index, renderItem, form);
            };
        };
        if (type === 'object') {
            for (var key in properties) {
                var propItem = properties[key];
                // 隐藏列
                if (!propItem.$tableColumnHidden) {
                    columnArr.push({
                        title: propItem.title,
                        key: key,
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
                title: title,
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
            render: function (value, record, index) {
                return (React.createElement(Button.Group, null,
                    React.createElement(Button, { onClick: function (event) { return handleDrawEditDataDisplayClick(index, event); } }, languagePack.formArray.operatingEdit),
                    React.createElement(Popconfirm, { title: languagePack.formArray.operatingPopconfirmTitle, onConfirm: function (event) { return handleDeleteDataClick(index, event); } },
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
            var tableValue = form.getFieldValue(id);
            tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
            var itemValue = tableValue[editIndex];
            var result = getObjectFromValue({ items: itemValue }, id);
            form.setFieldsValue(result);
        }
    }, [isDisplayDataDrawer, editIndex]);
    var inputNotDisplay = isNil(inputDisplayIndex);
    var value = form.getFieldValue(id);
    value = isNil(value) ? [] : value;
    // 对数组内的元素数量进行验证
    var arrayRulesVerificationResult = undefined;
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
        React.createElement(Table, { className: tableClassName(arrayRulesVerificationResult !== undefined), size: "middle", dataSource: items.type === 'object' ? value : formatTableValue(value), columns: columns(), bordered: true, title: function () { return [
                React.createElement(Button, { key: "add", type: "primary", icon: React.createElement(IconPlusCircleOutlined, null), onClick: function (event) { return handleDrawerDisplayClick(true, event); } }, languagePack.formArray.operatingAdd),
                React.createElement(Popconfirm, { key: "delete", title: languagePack.formArray.deleteSelectedText, onConfirm: function (event) { return handleDeleteSelectDataClick(event); } },
                    React.createElement(Button, { className: styleName('array-deleteAll'), type: "primary", danger: true, icon: React.createElement(IconDeleteOutlined, null) }, languagePack.formArray.deleteSelected))
            ]; }, rowKey: function (item, index) { return "" + index; }, rowSelection: {
                type: 'checkbox',
                selectedRowKeys: selectedRowKeys,
                onChange: handleColumnCheckboxChange
            }, components: inputNotDisplay ? components : undefined, pagination: false }),
        React.createElement("p", { className: styleName('array-table-rules-verification-str') }, arrayRulesVerificationResult),
        React.createElement(Drawer, { width: "100%", visible: isDisplayDataDrawer, destroyOnClose: true, closable: false },
            React.createElement(FormObject, { root: items, 
                // eslint-disable-next-line @typescript-eslint/tslint/config
                okText: editIndex !== undefined ? undefined : languagePack.formObject.addOkText, 
                // eslint-disable-next-line @typescript-eslint/tslint/config
                cancelText: editIndex !== undefined ? undefined : languagePack.formObject.addCancelText, onOk: handleAddOrEditDataClick, onCancel: function () { return handleDrawerDisplayClick(false); } }))));
}
TableComponent.propTypes = {
    root: PropTypes.object
};
export default TableComponent;
