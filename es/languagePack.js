"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultLang = __importStar(require("../language/default.json"));
var zhCNLang = __importStar(require("../language/zh-CN.json"));
var requireJson_1 = __importDefault(require("./utils/requireJson"));
// 语言包，key值小写
var languagePack = {
    'default': requireJson_1.default(defaultLang),
    'zh-cn': requireJson_1.default(zhCNLang)
};
exports.default = languagePack;
