/**
 * 添加icon脚本
 */
import fs from 'fs';
import path from 'path';
import axios from 'axios'
import { cp } from 'fs/promises';
import chalk from 'chalk';

/** 下载iconfont js文件 */
const getContent = async (url) => {
  if (url.startsWith('//')) url = 'https:' + url
  const response = await axios
    .get(url)
    .catch(() => {
      console.log(chalk.red('❌ faild: iconfont JS文件地址错误或请求失败}'))
      process.exit(1)
    })
  return response.data
}

/** 验证iconfont地址 */
const verifyUrl = (url) => {
  if (!url || /(\.css)$/.test(url) || !url.includes('.js')) {
    console.log(chalk.red('❌ faild: 请输入正确的iconfont JS地址}}'))
    return false
  } else {
    return true
  }
}

/**
 * 生成 iconfont 文件
 * @param { string } iconfontPath iconfont 地址
 * @returns { boolean }
 */
const generateIconFile = async (templatePath, iconfontPath, type) => {
  const type_ = type === 'create' ? '创建' : '替换';

  const targetSrc = templatePath + 'icon/iconfont.js';

  if (!verifyUrl(iconfontPath)) process.exit(1)

  /** 获取js 内容 */
  const jsContent = await getContent(iconfontPath)

  console.log(chalk.green('🎉 success: 下载iconfont JS成功'))
  try {
    // 写入文件
    fs.writeFileSync(targetSrc, jsContent)

    console.info(chalk.green(`🎉 success: ${type_}iconfont JS成功`))
  } catch (error) {

    console.log(chalk.red(`❌ faild: ${type_}iconfont JS失败`))
  }
}


/**
 * 创建模版
 * @param { string } templatePath 模版生成地址
 * @param { string } suffix 生成文件后缀
 */
const generateTemplate = async(templatePath, suffix) => {
  const sourceSrc = path.resolve(`src/app/addIcon/web/template/index.${suffix}`);
  const targetSrc = templatePath + 'icon/index.' + suffix;

  try {
    await cp(sourceSrc, targetSrc);
    console.log(chalk.green('🎉 success: 模版创建成功。'));
    return new Promise((resolve, _) => resolve())
  } catch (error) {
    console.log(chalk.red('❌ faild: 模版创建失败。'));
    process.exit(1)
  }
}

/**
 * 入口
 */
const addWebIcon = async (config) => {
  const { path, suffix, iconfontPath } = config

  /** 检测模版文件是否存在 */
  if (fs.existsSync(path + 'icon/index.' + suffix)) {
    
    /** 生成替换 iconfont.js */
    generateIconFile(path, iconfontPath, 'edit')
  } else {

    /**
     * 模版文件不存在
     * 
     * 创建模版文件
     */
    await generateTemplate(path, suffix)

    /** 生成创建 iconfont.js */
    generateIconFile(path, iconfontPath, 'create')
  }
};

export { addWebIcon }