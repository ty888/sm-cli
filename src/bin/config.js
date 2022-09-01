export const STRING_NOT_TRANSLATED = '__STRING_NOT_TRANSLATED__'

export const I18N = {
  zh: {
    code: 'zh',
    standardCode: 'zh-CN',
    name: '简体中文',
  },
  en: {
    code: 'en',
    standardCode: 'en-US',
    name: '英文',
  },
  tw: {
    code: 'tw',
    standardCode: 'zh-TW',
    name: '繁体中文',
  },
  ja: {
    code: 'ja',
    standardCode: 'ja',
    name: '日语',
  },
  es: {
    code: 'es',
    standardCode: 'es',
    name: '西班牙语'
  },
  fr: {
    code: 'fr',
    standardCode: 'fr',
    name: '法语',
  }
}

export const langs = Object.keys(I18N)

export const standardLangs = Object.keys(I18N).map(item => {
  return {code: item, standardCode: I18N[item].standardCode}
})

export const langsMap = Object.keys(I18N).map(item => {
  return {code: item, standardCode: I18N[item].standardCode, name: I18N[item].name}
})

export const I18N_PACKAGE = ['i18next', 'js-cookie', 'react-i18next', 'i18next-browser-languagedetector']

export const envMap = [
  {
    value: 'pro',
    title: '生成环境',
    baseURL: 'https://api.sunmi.com/v3/midl/minke'
  },
  {
    value: 'dev',
    title: '开发环境',
    baseURL: 'https://api.dev.sunmi.com/v3/midl/minke'
  },
  {
    value: 'test',
    title: '测试环境',
    baseURL: 'https://api.test.sunmi.com/v3/midl/minke'
  },
]

