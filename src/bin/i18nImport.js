/**
 * 从本地多语言 excel 解析至代码多语言配置中
 */
import xlsx from 'xlsx';
import path from 'path';
import fse from 'fs-extra';
import SortKeys from 'sort-keys';
import chalk from 'chalk';
import prompts from 'prompts';
import {
  langs,
  I18N
} from './config.js'

 const importSrcPrompts = {
  type: 'text',
  name: 'filePath',
  message: '输入导入的Excel地址',
  validate: value => {
    if (value === '') {
      return '地址不能为空!\n';
    }
    if (value.indexOf(' ') > -1) {
      return '地址不允许存在空格!\n';
    }
    if (!fse.pathExistsSync(value)) {
      return console.log('请输入正确的 excel 文件位置\n')
    }
    return true;
  }
}

/**
 * 获取代码中对应多语言的地址
 */
function getI18File(code) {
  return path.join(`src/i18n/locales/${code}/translation.json`)
}

/** 函数入口 */
async function i18nImport() {
  const {filePath} = await prompts(importSrcPrompts)

  const workbook = xlsx.readFile(filePath)
  const worksheet = workbook.Sheets['导出']
  const sheetData = xlsx.utils.sheet_to_json(worksheet)
  const i18n = {}
  
  for (const code of langs) {
    try {
      const pathname = getI18File(code)
      const data = await fse.readJson(pathname)
      i18n[code] = data
      // console.log(i18n, code, pathname)
    } catch (e) {
      return console.error(e)
    }
  }

  sheetData.forEach((item) => {
    for (const code of langs) {
      i18n[code][item.code] = item[I18N[code].name]
    }
  })

  for (const code in i18n) {
    try {
      const pathname = getI18File(code)
      fse.writeJson(pathname, SortKeys(i18n[code]), { spaces: 2 })
    } catch (e) {
      return console.error(e)
    }
  }

  console.log(chalk.green('🎉🎉🎉 导入成功！'))
}

export {
  i18nImport
}
