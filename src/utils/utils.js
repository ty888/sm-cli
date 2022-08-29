import chalk from 'chalk';
import path from 'path';
import fse from 'fs-extra';

/**
 * 根据 type 执行函数
 * type: web | android
 */
function runFn(type = 'web') {
  const fns = {}
  const self = {
    when: (type, fn) => {
      fns[type] = fn
      return self
    },
    run: (...parms) => {
      if (fns[type]) {
        return fns[type](...parms)
      }
      throw new Error(`没有找到${type}的Fn`)
    }
  }
  return self
}

/**
 * 检查环境
 * @param {string} type init = 初始化, other = 其他操作
 */
const checkEnv = async (type = 'other') => {
  const _packageSrc = path.resolve('package.json')
  const _src = path.resolve('src')
  const _configSrc = path.resolve('src/i18n/config.json')

  if (!fse.pathExistsSync(_src)) {
    console.log(chalk.red('❌ 运行环境不通过！, 请确保项目中有src文件夹'));
    process.exit()

  }

  if (!fse.pathExistsSync(_packageSrc)) {
    console.log(chalk.red('❌ 运行环境不通过！, 请确保项目中有package.json文件'));
    process.exit()
  }

  if (type !== 'init') {
    /** 非初始化操作 */
    if (!fse.pathExistsSync(_configSrc)) {
      /** 无配置文件 */
      console.log(chalk.red('❌ 运行环境不通过, 请确保项目中有config文件'));
      process.exit()
    } else {
      /** 有配置文件，返回配置文件内容 */
      const JsonData = await fse.readJson(_configSrc)
      console.log(chalk.green('✅ 环境检测通过。'));
      return JsonData
    }
  }
  console.log(chalk.green('✅ 环境检测通过。'));
  return true
}

export {
  runFn,
  checkEnv
}