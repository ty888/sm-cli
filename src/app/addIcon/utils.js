import { iconConfig } from './config.js';

/**
 * 合并Icon config
 * @param {userConf} object - 用户配置参数
 * @return {config_} object - 合并后的配置参数
*/
function mergeIconConfig(userConf) {
  const config_ = {...iconConfig}
  config_.path = userConf.path ?? config_.path;
  return config_
}

export {
  mergeIconConfig
}