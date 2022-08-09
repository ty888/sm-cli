/**
 * @author: ty
 * @description: 设置程序参数命令
 */
import { Command } from 'commander';
import { i18nextParser, i18nextExport, i18nImport, i18nInit, i18nPick} from '../bin/index.js';

const initProgram = () => {
  const program = new Command();

  /** global */
  program
    .name('sm-i18n')
    .version('1.0.0', '-v, --version')
    .description('商米大前端多语言工具集')
    .option('-c, --config', '初始化项目配置')
    .option('-e, --export', '导出')
    .option('-p, --parser', '格式化')
    .option('-i, --import', '导入')
    .option('-s, --scan', '文案扫描(开发阶段)')
    .action((conf) => {
      conf?.config && i18nInit();
      conf?.import && i18nImport();
      conf?.parser && i18nextParser();
      conf?.export && i18nextExport();
      conf?.scan && i18nPick();
    });
  program.parse(process.argv);
}

export {
  initProgram
};