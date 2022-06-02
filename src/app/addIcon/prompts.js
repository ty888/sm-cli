/**
 * @description: 创建icon
 */
const addIconPrompts = {
  type: 'text',
  name: 'iconfontPath',
  message: '输入iconfont地址',
  validate: value => {
    if (value === '') {
      return '地址不能为空!';
    }
    if (value.indexOf(' ') > -1) {
      return '地址不允许存在空格!';
    }
    return true;
  }
}


export {
  addIconPrompts,
}