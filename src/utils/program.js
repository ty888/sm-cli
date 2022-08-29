/**
 * @author: ty
 * @description: 设置程序参数命令
 */
import { Command } from 'commander';
import { i18nextParser, i18nextExport, i18nImport, i18nInit, i18nPick, i18nTest, i18nUpdate} from '../bin/index.js';
import {readCliPackageJson} from './readFile.js'

const initProgram = async () => {
  const program = new Command();
  const packageData = await readCliPackageJson()
  const version = packageData?.version || '0.0.1'

  /** global */
  program
    .name('sm-i18n')
    .version(version, '-v, --version')
    .description('商米大前端多语言工具集')
    .option('-c, --config', '初始化项目配置')
    .option('-e, --export', '导出')
    .option('-p, --parser', '格式化')
    .option('-i, --import', '导入')
    .option('-u, --update', '拉取线上最新')
    .option('-s, --scan', '文案扫描(开发阶段)')
    .option('-t, --test', '测试')
    .action((conf) => {
      conf?.config && i18nInit();
      conf?.import && i18nImport();
      conf?.parser && i18nextParser();
      conf?.export && i18nextExport();
      conf?.scan && i18nPick();
      conf?.test && i18nTest();
      conf?.update && i18nUpdate();
    });

  program
    .command('init')
    .action(function () {
      i18nInit()
    })
  
  program
  .command('import')
  .action(function () {
    i18nImport()
  })

  program
  .command('export')
  .action(function () {
    i18nextExport()
  })

  program
  .command('update')
  .action(function () {
    i18nUpdate()
  })

  program.parse(process.argv);
}

export {
  initProgram
};