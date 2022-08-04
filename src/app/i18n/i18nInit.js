/**
 * 初始化项目i18环境
 * 1.生成 script/i18nConfig.js i18配置文件
 * 2.根据当前默认支持多语言生成 locales/${code}/translation.json 本地文件
 * 3.项目内安装 i18next js-cookie react-i18next i18next-browser-languagedetector 
 * 4.提示 在入口处运行 script/i18nConfig.js -> "import src/script/i18nConfig.js"
 */

import prompts from 'prompts'
import chalk from 'chalk';
import path from 'path';
import ora from 'ora';
import {
  cp
} from 'fs/promises';
import fse from 'fs-extra';
import * as url from 'url';
import {
  I18N,
  langs,
  I18N_PACKAGE
} from './config.js'
import {
  exec
} from 'child_process'
import {
  initI18nConfigJs
} from './generate/index.js'

const __dirname = url.fileURLToPath(new URL('.',
  import.meta.url));

const _package = I18N_PACKAGE.join(' ')

/** 安装必要包 */
async function installPackage() {
  return new Promise(async (resolve, reject) => {

    const answers = await prompts([{
      message: '选一个你喜欢的包管理工具',
      type: 'select',
      name: 'package',
      choices: [{
          title: 'yarn',
          value: 'yarn',
        },
        {
          title: 'npm',
          value: 'npm',
        },
        {
          title: '无需下载',
          value: 'none',
        }
      ]
    }])

    if (answers.package === 'none') {
      resolve()
    } else {
      const useYarn = answers.package === 'yarn'

      const lqProcess = ora(`正在下载三方包 ${_package}\n`)
      lqProcess.start()

      exec(`${useYarn ? 'yarn add' : 'npm i'} ${_package}`, function (error) {
        if (error) {
          reject(error)
        }
        lqProcess.succeed()
        console.info(chalk.green(`🎉 success: ${_package} 下载成功.`))
        resolve()
      })
    }

  })

}

/** 生成配置文件 */
async function generateConfigureFile() {
  // const answers = await prompts([{
  //   type: 'multiselect',
  //   message: '选择当前项目需要支持的多语言。',
  //   name: 'langs',
  //   choices: Object.values(I18N).map(item => {
  //     return {
  //       title: item.name,
  //       value: item.code
  //     }
  //   })
  // }])

  const sourceSrc = path.join(__dirname, './template/translation.json');
  const configTargetSrc = path.resolve('./src/script/i18nConfig.js');

  console.log(__dirname)

  for (const code of langs) {
    try {
      const targetSrc = path.resolve(`./src/locales/${code}/translation.json`);
      await cp(sourceSrc, targetSrc);
      console.log(chalk.green(`🎉 success: ${targetSrc} ${I18N[code].name} 生成成功。`));
    } catch (e) {
      console.log(chalk.red(`❌ faild: ${code} 生成失败。`));
      process.exit(1)
    }
  }

  try {
    // 文件不存在则创建文件
    fse.ensureFileSync(configTargetSrc)
    fse.writeFileSync(configTargetSrc, initI18nConfigJs(langs))
    console.log(chalk.green(`🎉 success: ${configTargetSrc} i18配置文件 生成成功。`));
  } catch (error) {
    console.log(chalk.red(`❌ faild: i18n配置文件生成失败。`), error);
  }

  // try {
  //   await cp(configSourceSrc, configTargetSrc);
  //   console.log(chalk.green(`🎉 success: ${configTargetSrc} i18配置文件 生成成功。`));
  // } catch (error) {
  //   console.log(chalk.red(`❌ faild: i18n配置文件生成失败。`));
  //   process.exit(1)
  // }

}


async function i18nInit() {
  await generateConfigureFile()

  console.log(chalk.bgGreen(`即将下载必要三方库。${_package}`));

  await installPackage()

  console.log(chalk.green('🎉 success: 恭喜！项目初始化完成。\n'));

  console.log(chalk.blue('提示：\n接下来需要将 i18nConfig.js 在项目入口处引入\nimport "src/script/i18nConfig.js"'));
}


export {
  i18nInit
}