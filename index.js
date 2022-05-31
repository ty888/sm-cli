/** 三方 */
import chalk from 'chalk';
import prompts from 'prompts';

/** 脚本 */
import { addIcon } from './src/app/addIcon/index.js';

/** utils */
import { openEditor, initProgram, initPrompts } from './src/utils/index.js';


const init = async () => {
  
  /** 设置程序参数命令 */
  initProgram()
  
  /** 入口选择操作 */
  const initResponse = await prompts(initPrompts);

  if (initResponse.operation === 'config') {
    /**
     * 打开配置文件
     * 
     * 默认使用vscode打开
     * 
     * 其他编辑器可参考 (https://github.com/sindresorhus/env-editor)
     */
    openEditor(['./src/config/index.js'], { editor: 'vscode' });

  } else if (initResponse.operation === 'add-icon') {

    // 添加Icon
    addIcon()
  } else {
    
    // 未匹配类型
    console.log(chalk.red('不理解的操作类型！'));
    return
  }
}

init();