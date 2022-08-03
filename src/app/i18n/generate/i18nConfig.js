const initI18nConfigJs = (langs = ['zh', 'en']) => {

  function gImport() {
    let _i = ''
    langs.forEach(lang => {
      _i += `import ${lang}Trans from '../locales/${lang}/translation.json'` + '\n'
    })
    return _i
  }

  function gLOCAL_TRANS() {
    const _o = {}
    langs.forEach(lang => {
      _o[lang] = {
        translation: lang + 'Trans'
      }
    })
    return JSON.stringify(_o)
  }
  
  return `import i18n from 'i18next'
import Cookies from 'js-cookie'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
${gImport()}
const LOCAL_TRANS = ${gLOCAL_TRANS().replaceAll('"','')}
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
  `
}


export {
  initI18nConfigJs
}