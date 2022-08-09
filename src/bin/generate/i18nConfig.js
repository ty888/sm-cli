const initI18nConfigJs = (langs) => {
  function gImport() {
    let _i = ''
    langs.forEach(lang => {
      _i += `import ${lang.code}Trans from '../locales/${lang.code}/translation.json'` + '\n'
    })
    return _i
  }

  function gLOCAL_TRANS() {
    const _o = {}
    langs.forEach(lang => {
      console.log(lang)
      const {code, standardCode} = lang
      _o[`'${standardCode}'`] = {
        translation: code + 'Trans'
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

// URL lang
const urlLang = new URL(window.location.href).searchParams.get('lang')

// 默认使用英文多语言
const DEFAULT_LNG = 'zh-CN'

// 本地多语言默认存放文件夹
const DEFAULT_LOCALE_PATH = '../locales'

// 设置cookies
Cookies.set(LNG_KEY, urlLang || DEFAULT_LNG)

// url > cookies > default lang
export const currentLang =  urlLang || Cookies.get(LNG_KEY) || DEFAULT_LNG

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
      const currLng = currentLang
      const localTrans = LOCAL_TRANS[currLng]?.[key]
      return localTrans || '' // 使用本地对应多语言兜底
    }
  })

window.t = i18n.t

export default i18n  
  `
}


export {
  initI18nConfigJs
}