/**
 * @author: ty
 * @description: 设置程序参数命令
 */
import { Command } from 'commander';
import { runIcon } from '../app/addIcon/index.js'
import { openEditor } from './index.js'
import { i18nextParser, i18nextExport, i18nImport, i18nInit } from '../app/i18n/index.js';

const initProgram = () => {
  const program = new Command();

  /** global */
  program
    .name('sum-cli')
    .description('商米大前端工具集。')
    .version('0.8.0')


  /** icon */
  program.command('icon')
    .description('商米大前端工具集 - 添加icon')
    // .option('-i, --init', '初始化icon 模版路径')
    .option('-t, --type <type>', '运行类型。web | android', 'web')
    .option('-p, --path <path>', '配置iconpath', './')
    .option('-s, --suffix <suffix>', '生成模版的后缀。tsx | jsx', 'tsx')
    .action((conf) => {
      runIcon(conf)
    });

  /** config */
  program.command('conf')
  .description('商米大前端工具集 - 配置全局参数')
  .option('-p, --path <path>', '配置iconpath')
  .action(() => {
    /**
     * 打开配置文件
     * 
     * 默认使用vscode打开
     * 
     * 其他编辑器可参考 (https://github.com/sindresorhus/env-editor)
     */
    openEditor(['./src/config/index.js'], { editor: 'vscode' });
  });

  /** 多语言工具 */
  program.command('i18n')
  .description('商米大前端工具集 - 多语言工具')
  .option('-c, --config', '初始化项目配置')
  .option('-p, --parser', '格式化')
  .option('-i, --import', '导入')
  .option('-e, --export', '导出')
  .action((conf) => {
    conf?.config && i18nInit();
    conf?.import && i18nImport();
    conf?.parser && i18nextParser();
    conf?.export && i18nextExport();
  });

  program.parse(process.argv);
}

export {
  initProgram
};