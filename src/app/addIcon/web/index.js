/**
 * 添加icon脚本
 */
import fs from 'fs';
import chalk from 'chalk';
import { config } from '../../../config/index.js';

const {
  iconProps
} = config;

/**
 * 错误校验
 * @param fileName 文件名
 * @param iconPath svg路径
 * @returns boolean
 */
const verifyUrl = (fileName, iconPath) => {
  if (!fileName) {
    console.error(chalk.red('❌ ERROR: 请输入文件名。'));
    return false;
  }

  if (fileName.length > iconProps.fileNameLength) {
    console.error(chalk.red(`❌ ERROR: 文件名过长，不得超过${iconProps.fileNameLength}。`));
    return false;
  }

  if (!iconPath) {
    console.error(chalk.red('❌ ERROR: 路径出错了。'));
    return false;
  }
  return true;
};

/**
 * 创建图标文件
 * @param fileName 文件名
 * @param iconPath svg路径
 * @returns void
 */
const createIcon = (fileName, iconPath) => {
  const _iconPath = iconPath.replace(/<svg.+?>([\s\S]+)<\/svg>/, '$1');

  const _tempData = `export const ${fileName} = (
  <>
    ${_iconPath}
  </>
);`;

  try {
    /** 创建icon 文件，写入svg */
    fs.writeFileSync(iconProps.path + fileName + iconProps.defaultExtension, _tempData);

  } catch (error) {
    console.log(chalk.red('❌ ERROR: 出错了。'));
  }

  /** 设置了exportPath即可导出 */
  if (iconProps.exportPath) {
    const _tempImport = `\nexport * from "./paths/${fileName}"`;
    try {
      /** 统一出口 导出 */
      fs.appendFileSync(iconProps.exportPath, _tempImport);
    } catch (err) {
      console.log(chalk.red('❌ ERROR: 统一导出出错。'));
    }

  }

  /** 成功了 */
  console.log(chalk.green('🎉 Icon 创建成功。点击(Cmd+单击)下方链接访问 ⬇️'));
  console.log(chalk.blue(iconProps.path + fileName + iconProps.defaultExtension));
};

/**
 * 统一入口
 */
const addWebIcon = (fileName, iconPath) => {
  /** 校验错误 */
  if (!verifyUrl(fileName, iconPath)) process.exit(1);

  /** 创建icon */
  createIcon(fileName, iconPath);
};

export { addWebIcon }