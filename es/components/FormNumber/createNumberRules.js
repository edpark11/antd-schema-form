var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import template from '../../utils/template';
function createNumberRules(languagePack, root, required, isInteger) {
    var _this = this;
    var $required = root.$required, $requiredMessage = root.$requiredMessage, minimum = root.minimum, maximum = root.maximum, $minimumMessage = root.$minimumMessage, $maximumMessage = root.$maximumMessage, $integer = root.$integer, $integerMessage = root.$integerMessage, $enumMessage = root.$enumMessage;
    var enums = root["enum"];
    var rules = [];
    // 判断表单是否必填
    if ($required || required) {
        rules.push({
            required: true,
            message: $requiredMessage || languagePack.rules.required
        });
    }
    // 枚举
    if (enums) {
        rules.push({
            type: 'enum',
            "enum": enums,
            message: template($enumMessage || languagePack.rules["enum"], {
                '0': "[" + enums.join(', ') + "]"
            })
        });
    }
    // 整数
    if (isInteger || $integer) {
        rules.push({
            type: 'integer',
            message: $integerMessage || languagePack.rules.number.integer
        });
    }
    // 最小值
    if (!isNil(minimum) && isNumber(minimum)) {
        rules.push({
            validator: function (rule, value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(minimum !== undefined)) return [3 /*break*/, 4];
                            if (!(typeof value === 'number' && value < minimum)) return [3 /*break*/, 1];
                            throw new Error(typeof rule.message === 'string' ? rule.message : undefined);
                        case 1: return [4 /*yield*/, Promise.resolve()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, Promise.resolve()];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: return [2 /*return*/];
                    }
                });
            }); },
            message: template($minimumMessage || languagePack.rules.number.minimum, {
                '0': minimum
            })
        });
    }
    // 最大值
    if (!isNil(maximum) && isNumber(maximum)) {
        rules.push({
            validator: function (rule, value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(maximum !== undefined)) return [3 /*break*/, 4];
                            if (!(typeof value === 'number' && value > maximum)) return [3 /*break*/, 1];
                            throw new Error(typeof rule.message === 'string' ? rule.message : undefined);
                        case 1: return [4 /*yield*/, Promise.resolve()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, Promise.resolve()];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: return [2 /*return*/];
                    }
                });
            }); },
            message: template($maximumMessage || languagePack.rules.number.maximum, {
                maximum: maximum
            })
        });
    }
    return rules;
}
export default createNumberRules;
