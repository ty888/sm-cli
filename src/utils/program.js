/**
 * @author: ty
 * @description: 设置程序参数命令
 */
import  { Command } from 'commander';

const initProgram = () => {
  const program = new Command();

  program
    .option('-v, --verson', 'verson')
  
  program.parse(process.argv);
  
  const options = program.opts();
  if (options.verson) console.log('v1.0.0');
}

export {
  initProgram
};