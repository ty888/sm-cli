import fse from 'fs-extra';
import fs from 'fs';
import ora from 'ora'
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts'
import axios from 'axios';
import * as url from 'url';
import {checkEnv} from '../utils/utils.js'
import {parseExcel} from './index.js'
import {
  langs
} from './config.js'

const __dirname = url.fileURLToPath(new URL('.',
  import.meta.url));

const tempExcelSrc = path.join(__dirname, './tempExcel.xlsx');

// 从多语言平台获取数据
async function urlToFile(url) {
  
  let writer = fs.createWriteStream(tempExcelSrc); //创建一个写入流

  const fileResponse = await axios.request({
      url: url,
      method: "GET",
      responseType: "stream",
  });
  fileResponse.data.pipe(writer);
  return writer
}


// 获取多语言平台数据并且写入到本地指定文件夹
async function fetchData (projectCode, baseURL, langsData) {
  const lqProcess = ora("正在拉取多语言平台数据.")
  lqProcess.start()

  const response = await axios.request({
    method: 'POST',
    url: '/public/ProjectVersionFacade/currentVersion',
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "context": {
        "projectCode": projectCode
      },
      "request": {},
    },
  })

  if(!response.data.data){
    lqProcess.fail(`${response.data.msg || '接口请求失败.'}`)
    fse.removeSync(tempExcelSrc);
    process.exit()
  }

  lqProcess.succeed('拉取成功.')
  const tbProcess = ora("正在同步本地数据")
  tbProcess.start()

  const excelUrl = response?.data?.data?.resource?.[0]?.url
  const writer = await urlToFile(excelUrl)

  writer.on("finish", async () => {
    const res = await parseExcel(tempExcelSrc, langsData)
    if(res === true) {
      tbProcess.succeed('同步成功.')
      fse.removeSync(tempExcelSrc);
    } else {
      tbProcess.fail('同步失败.', res)
      fse.removeSync(tempExcelSrc);
    }
  });
}

async function i18nUpdate() {
  const env = await checkEnv()
  const langsData = env?.targetLang || langs;
  const projectCode = env?.projectCode;
  console.log(env)
  if(!projectCode) {
    console.log(chalk.red(`❌ 请在配置文件中添加projectCode.`));
    process.exit()
  }
  // const _choice = envMap.map(item => {
  //   return {
  //     value: [item.value, item.baseURL],
  //     title: item.title
  //   }
  // })
  // const answer = await prompts([{
  //   type: 'select',
  //   name: 'value',
  //   message: '选择同步环境.',
  //   choices: _choice,
  //   initial: 0
  // }])

  if(!projectCode) {
    console.log(chalk.red(`❌ 请配置projectCode.`));
    process.exit()
  }
  const baseURL = "https://api.sunmi.com/v3/midl/minke"

  await fetchData(projectCode, baseURL, langsData)
}

export {
  i18nUpdate
}