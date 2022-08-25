/**
 * 解析本地多语言
 */
import inquirer from 'inquirer'
import {spawn} from 'child_process'
import shell from 'shelljs'
import fse from 'fs-extra'
import path from 'path'
import SortKeys from 'sort-keys'
import * as url from 'url';
import { checkEnv } from '../utils/utils.js'
import { langs } from './config.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// 多语言 json 数据写入逻辑
async function writeI18nJson(path, data) {
  return fse.writeJson(path, SortKeys(data), {
    spaces: 2,
  })
}

// 排序后重新写入本地文件夹
async function i18nextSort() {
  for (const code of langs) {
    try {
      const pathname = path.join(`./src/i18n/locales/${code}/translation.json`)
      const exists = await fse.pathExists(pathname)
      if(exists) {
        const data = await fse.readJson(pathname)
        await writeI18nJson(pathname, data)
      }
    } catch (e) {
      return console.error(e)
    }
  }
  console.log('🎉🎉🎉 多语言格式化成功')
}

async function i18nextParser() {
  await checkEnv()

  if (!shell.which('i18next')) {
    console.error('❗️❗️❗️首先需要全局安装 i18next-parser 才能执行这个命令')

    inquirer
      .prompt([{
        type: 'list',
        name: 'package',
        message: 'What package management tool do you like?',
        choices: ['yarn', 'npm'],
      }, ])
      .then((answers) => {
        const useYarn = answers.package === 'yarn'

        let cmd
        let args

        if (useYarn) {
          cmd = 'yarn'
          args = ['global', 'add', 'i18next-parser']
        } else {
          cmd = 'npm'
          args = ['i', '-g', 'i18next-parser']
        }

        spawn(cmd, args, {
          stdio: 'inherit'
        })
      })
  } else {
    const args = []
    args.push('--config', `${path.resolve(__dirname, 'i18next-parser.config.js')}`)
    const i18next = spawn('i18next', args, { stdio: 'inherit' })
    i18next.on('close', () => i18nextSort())
  }
}

export {
  i18nextParser
}