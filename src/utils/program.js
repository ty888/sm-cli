/**
 * @author: ty
 * @description: 设置程序参数命令
 */
import { Command } from 'commander';
import { runIcon } from '../app/addIcon/index.js'
import { i18nextParser, i18nextExport, i18nImport, i18nInit, i18nPick} from '../app/i18n/index.js';

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

  /** 多语言工具 */
  program.command('i18n')
  .description('商米大前端工具集 - 多语言工具')
  .option('-c, --config', '初始化项目配置')
  .option('-e, --export', '导出')
  .option('-p, --parser', '格式化')
  .option('-i, --import', '导入')
  .option('-s, --scan', '文案扫描')
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