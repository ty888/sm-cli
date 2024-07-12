import i18next from 'i18next'
import Cookies from 'js-cookie'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { i18nextPlugin } from 'translation-check'
import zhTrans from '../locales/zh/translation.json'
import twTrans from '../locales/tw/translation.json'
import enTrans from '../locales/en/translation.json'
import frTrans from '../locales/fr/translation.json'
import jaTrans from '../locales/ja/translation.json'
import esTrans from '../locales/es/translation.json'

const LOCAL_TRANS = {'zh-CN':{translation:zhTrans},'zh-TW':{translation:twTrans},'en-US':{translation:enTrans},'fr':{translation:frTrans},'ja':{translation:jaTrans},'es':{translation:esTrans}}
// cookie 中使用的多语言键值
export const LNG_KEY = 'smPlatLang'

// URL lang
const urlLang = new URL(window.location.href).searchParams.get('lang')

// 默认使用英文多语言
const DEFAULT_LNG = 'zh-CN'

// 本地多语言默认存放文件夹
const DEFAULT_LOCALE_PATH = '../locales'

// 设置cookies
Cookies.set(LNG_KEY, urlLang || DEFAULT_LNG)

// 多语言配置初始化
i18n
  .use(LanguageDetector) // 默认多语言嗅探
  .use(initReactI18next) // 初始化配置
  .use(i18nextPlugin)
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
  