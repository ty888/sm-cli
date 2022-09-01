import fse from 'fs-extra';
import path from 'path';
import {readPackageJson} from '../utils/readFile.js'
import {checkEnv} from '../utils/utils.js'

async function i18nTest() {
  await checkEnv()
  console.log("test1")

}

export {
  i18nTest
}
