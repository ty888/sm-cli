import { langs, STRING_NOT_TRANSLATED } from './config.js'

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
  locales: langs,
  namespaceSeparator: false,
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: [
    `${process.cwd()}/src/**/*.{ts,tsx,js,jsx}`,
  ],
  sort: false,
  verbose: true,
}