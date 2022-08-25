import fse from 'fs-extra';
import path from 'path';
import {readPackageJson} from '../utils/readFile.js'
import {checkEnv} from '../utils/utils.js'


async function i18nTest() {

  const env = await checkEnv()
  console.log(env)

}

export {
  i18nTest
}