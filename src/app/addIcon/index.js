import prompts from 'prompts';
import { runFn } from '../../utils/utils.js';
import { addIconPrompts } from '../../utils/prompts.js';
import { addWebIcon } from './web/index.js';

const addIcon = async() => {
  /** 录入icon参数 */
  const addIconResponse = await prompts(addIconPrompts);

  runFn(addWebIcon, () => {})(addIconResponse.name, addIconResponse.path)
}

export {
  addIcon
}
