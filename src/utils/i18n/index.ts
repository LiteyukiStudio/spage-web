import { createI18n} from 'vue-i18n'
import en from './locales/en.json'
import zhcn from './locales/zh-cn.json'

export const i18n = createI18n({
  locale: localStorage.getItem('language') || 'zh-cn', // set locale
  fallbackLocale: 'zh-cn',
  messages: {
    en: en,
    'zh-cn': zhcn
  }
})

console.log(zhcn)