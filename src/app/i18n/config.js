export const STRING_NOT_TRANSLATED = '__STRING_NOT_TRANSLATED__'

export const I18N = {
  zh: {
    code: 'zh',
    name: '简体中文',
  },
  tw: {
    code: 'tw',
    name: '繁体中文',
  },
  en: {
    code: 'en',
    name: '英文',
  },
  fr: {
    code: 'fr',
    name: '法语',
  },
  ja: {
    code: 'ja',
    name: '日语',
  },
  es: {
    code: 'es',
    name: '西班牙语'
  },
}

export const langs = Object.keys(I18N)

export const I18N_PACKAGE = ['i18next', 'js-cookie', 'react-i18next', 'i18next-browser-languagedetector']
