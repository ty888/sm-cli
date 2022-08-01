export default {
  defaultNamespace: 'translation',
  defaultValue: (locale, _namespace, key) => {
    if (locale === 'zh') {
      return key
    }
    return '__STRING_NOT_TRANSLATED__'
  },
  keepRemoved: true,
  keySeparator: false,
  locales: ['zh', 'en', 'de', 'fr', 'ja', 'es'],
  namespaceSeparator: false,
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: [
    `${process.cwd()}/src/**/*.{ts,tsx,js,jsx}`,
  ],
  sort: false,
  verbose: true,
}