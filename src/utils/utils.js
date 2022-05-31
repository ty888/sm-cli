import chalk from 'chalk';
import { config } from '../config/index.js';

/**
 * 根据type 执行函数
 * @param {*} fn1 type 为web时执行的函数
 * @param {*} fn2 type 为android时执行的函数
 */
const runFn = (fn1, fn2) => {
  return (...params) => {
    if (config.type === 'web') {
      fn1(...params);
    } else if (config.type === 'android') {
      fn2(...params);
    } else {
      console.log(chalk.red('不支持该类型'));
    }
  }
}

export {
  runFn
}