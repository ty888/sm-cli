/**
 * 导出本地多语言
 *  - 增量导出
 *  - 全量导出
 */

import os from 'os';
import path from 'path';
import fse from 'fs-extra';
import pkg from 'lodash';
import xlsx from 'xlsx';
import chalk from 'chalk';
import moment from 'moment';
import prompts from 'prompts';
import {
  langs,
  STRING_NOT_TRANSLATED,
  I18N
} from './config.js';
import { checkEnv } from '../utils/utils.js'

const {
  merge,
  sortBy
} = pkg;

function returnSheetData(i18n, i18nCode, langsData) {
  const _data = {}

  langsData.forEach(code => {
    _data[I18N[code].name] = i18n?.[code]?.[i18nCode]
  })
  return _data
}

// 格式化导出 excel 的标题栏
function getSheetData(i18n, langsData) {
  const i18nCodes = Array.from(
    new Set(
      Object.values(i18n)
      .map((lang) => Object.keys(lang))
      .flat(Infinity),
    ),
  )

  return i18nCodes.map((i18nCode) => ({
    code: i18nCode,
    ...returnSheetData(i18n, i18nCode, langsData)
  }))
}


function exportExcel(sheetData, i18nExportFile) {
  sheetData = sortBy(sheetData, ['code'])

  const wb = xlsx.utils.book_new()
  const wx = xlsx.utils.json_to_sheet(sheetData)

  xlsx.utils.book_append_sheet(wb, wx, '导出')
  xlsx.writeFileAsync(i18nExportFile, wb,{}, () => {
    console.log(chalk.green(`🎉 成功导出到文件\n ${i18nExportFile}`))
  })
}

// 导出逻辑入口
async function i18nextExport(options) {
  // await i18nextParser()

  const env = await checkEnv()
  const langsData = env?.targetLang || langs

  const answers = await prompts([{
    type: 'select',
    message: '选择导出模式',
    name: 'exportModel',
    choices: [
      { title: '增量导出', value: 'add', description: '导出本次新增文案' },
      { title: '全量导出', value: 'all', description: '导出项目中全部文案' },
    ]
  }])


  const i18n = {}

  for (const code of langsData) {
    try {
      const pathname = path.join(`src/i18n/locales/${code}/translation.json`)
      const data = await fse.readJson(pathname)
      i18n[code] = data
    } catch (e) {
      console.error(e)
    }
  }

  let sheetData = getSheetData(i18n, langsData)

  sheetData = sheetData.filter((data) => {
    if (answers.exportModel === 'all') {
      return true
    }

    const isNormalKey =
      data['简体中文'] === STRING_NOT_TRANSLATED || data['英文'] === STRING_NOT_TRANSLATED
    const isTransKey =
      data['简体中文'] === data['英文'] &&
      /<(\w+)[^>]*>(.*?<\/\1>)?/.test(data['简体中文'])

    if (isNormalKey || isTransKey) {
      return true
    }
  })

  if (sheetData.length === 0) {
    console.warn('😂 暂无数据')
    return
  }

  let i18nExportFile = '';

  i18nExportFile = path.resolve(os.homedir(), 'Downloads', `${moment(new Date().getTime()).format('YYYY-MM-DD_hh-mm-')}${new Date().getTime()}.xlsx`)

  if (!options || !options.merge) {
    try {
      await fse.remove(i18nExportFile)
    } catch (e) {
      console.error(e)
      return
    }
  } else {
    const oldSheetData = getI18nExportFileSheetData(i18nExportFile)
    sheetData = merge(oldSheetData, sheetData)
  }
  exportExcel(sheetData, i18nExportFile)
}

export {
  i18nextExport
}