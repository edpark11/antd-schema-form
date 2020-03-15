import { defaultString, textArea, select, radio, date, password, defaultNumber, defaultBoolean, switchComponent, defaultArray, checkboxGroup, multipleOrTags, defaultObject, defaultOneOf } from './components/custom/custom';
var customComponent = {
    defaultString: defaultString,
    textArea: textArea,
    select: select,
    radio: radio,
    date: date,
    password: password,
    defaultNumber: defaultNumber,
    defaultBoolean: defaultBoolean,
    "switch": switchComponent,
    defaultArray: defaultArray,
    checkboxGroup: checkboxGroup,
    multiple: multipleOrTags,
    tags: multipleOrTags,
    defaultObject: defaultObject,
    defaultOneOf: defaultOneOf
};
export default customComponent;
