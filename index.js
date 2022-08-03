import { initProgram } from './src/utils/index.js';
import * as dotenv from 'dotenv'


const init = async () => {
  dotenv.config()

  // /** 设置程序参数命令 */
  initProgram();
}

init();
