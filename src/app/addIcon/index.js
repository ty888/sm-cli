import prompts from 'prompts';
import { runFn } from '../../utils/utils.js';
import { addIconPrompts } from './prompts.js';
import { addWebIcon } from './web/index.js';
import { addAndroidIcon } from './android/index.js';

const runIcon = async(config) => {
  /**
   * 录入icon参数，获取参数
   * @param { type } string - 运行类型。web | android
   * @param { path } string - icon模版存放地址
   * @param { suffix } string - 文件后缀名
  */
  const addIconResponse = await prompts(addIconPrompts);

  const config_ = {
    ...config,
    ...addIconResponse
  }

  /**
   * 运行 icon 库
   */
  runFn(config.type)
  .when('web', addWebIcon)
  .when('android', addAndroidIcon)
  .run(config_);
}


export {
  runIcon
}
