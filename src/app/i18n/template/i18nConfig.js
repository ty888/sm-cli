/**
 * 多语言配置逻辑：基于 i18next + react-i18next
 */
import i18n from 'i18next'
import Cookies from 'js-cookie'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import zhTrans from '../locales/zh/translation.json' // 中文本地多语言
import enTrans from '../locales/en/translation.json' // 英语本地多语言
import deTrans from '../locales/de/translation.json' // 德语本地多语言
import jaTrans from '../locales/ja/translation.json' // 日语本地多语言
import frTrans from '../locales/fr/translation.json' // 法语本地多语言
import esTrans from '../locales/es/translation.json' // 西班牙语本地多语言


// 本地多语言配置：业务需求，默认支持 中文、英语、德语、日语、法语、西班牙语 六国语言
const LOCAL_TRANS = {
  zh: {
    translation: zhTrans
  },
  en: {
    translation: enTrans
  },
  de: {
    translation: deTrans
  },
  ja: {
    translation: jaTrans
  },
  fr: {
    translation: frTrans
  },
  es: {
    translation: esTrans
  },
}
// cookie 中使用的多语言键值
export const LNG_KEY = 'smPlatLang'

// 默认使用英文多语言
const DEFAULT_LNG = 'zh'

// 本地多语言默认存放文件夹
const DEFAULT_LOCALE_PATH = '../locales'

// 多语言配置初始化
i18n
  .use(LanguageDetector) // 默认多语言嗅探
  .use(initReactI18next) // 初始化配置
  .init({
    resources: LOCAL_TRANS,
    defaultNS: 'translation',
    detection: {
      caches: false,
      order: ['cookie', 'localStorage'],
      lookupCookie: LNG_KEY,
    },
    fallbackLng: DEFAULT_LNG,
    load: 'currentOnly',
    localePath: DEFAULT_LOCALE_PATH,
    debug: false,
    shallowRender: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    },
    parseMissingKeyHandler: (key) => {
      // 缺失词条的处理，如果从远端没有获取到对应词条，可以在此做兜底处理
      const currLng = Cookies.get(LNG_KEY) || DEFAULT_LNG
      const localTrans = LOCAL_TRANS[currLng]?.[key]
      return localTrans || '' // 使用本地对应多语言兜底
    }
  })

export default i18n
 