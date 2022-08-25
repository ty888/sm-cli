import { langs, STRING_NOT_TRANSLATED } from './config.js'
import {
  readConfig
} from '../utils/readFile.js'

const configData = await readConfig()

export default {
  defaultNamespace: 'translation',
  defaultValue: (locale, _namespace, key) => {
    if (locale === 'zh') {
      return key
    }
    return STRING_NOT_TRANSLATED
  },
  keepRemoved: true,
  keySeparator: false,
  locales: configData?.targetLang || langs,
  namespaceSeparator: false,
  output: 'src/i18n/locales/$LOCALE/$NAMESPACE.json',
  input: [
    `${process.cwd()}/src/**/*.{ts,tsx,js,jsx}`,
  ],
  sort: false,
  verbose: true,
}