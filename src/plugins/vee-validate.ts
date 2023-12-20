// 引入 VeeValidate 元件跟功能
import {
  defineRule, configure
} from 'vee-validate';
// 引入 VeeValidate 的驗證規則
import * as rules from '@vee-validate/rules';

// 使用 Object.keys 將 rules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(rules)
.filter((k) => k !== 'default')
.forEach((rule) => {
  defineRule(rule, (rules as Record<string, any>)[rule]);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');


// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';