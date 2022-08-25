import fse from 'fs-extra';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.',
  import.meta.url));

/** 读package.json */
const readPackageJson = async () => {
  const _src = path.resolve('package.json')
  if(fse.pathExistsSync(_src)) {
    const JsonData = await fse.readJson(_src)
    return JsonData
  } else {
    return false
    // throw new Error('package.json 文件未找到！')
  }
}

/** 读配置文件 */
const readConfig = async () => {
  const _src = path.resolve('src/i18n/config.json')
  if(fse.pathExistsSync(_src)) {
    const JsonData = await fse.readJson(_src)
    return JsonData
  } else {
    return false
    // throw new Error('config.json 文件未找到')
  }
}

/** 读Json文件 */
const readJson = async (src) => {
  if(!src) {
    throw new Error('请输入文件路径')
  }
  const _src = path.resolve(src)
  if(fse.pathExistsSync(_src)) {
    const JsonData = await fse.readJson(_src)
    return JsonData
  } else {
    throw new Error(src + ' 文件未找到')
  }
}

/** 读配置文件 */
const readCliPackageJson = async () => {
  const _src = path.join(__dirname, '../../package.json')
  if(fse.pathExistsSync(_src)) {
    const JsonData = await fse.readJson(_src)
    return JsonData
  } else {
    return false
  }
}


export {
  readPackageJson,
  readConfig,
  readJson,
  readCliPackageJson
}