/**
 * @description: 入口选择
 * 程序运行时，选择执行入口
 */
const initPrompts = (_) => {
  return {
    type: 'select',
    name: 'operation',
    message: '选择要执行的操作。',
    choices: [{
        title: '全局配置',
        value: 'config',
        description: '配置当前生效端、默认端口号、icon 配置参数等。'
      },
      {
        title: '添加Icon',
        value: 'add-icon',
        description: '添加Icon, 使用前先配置对应路径。'
      },
    ],
  }
};


/** 添加icon选择 */
const addIconPrompts = (config) => [{
    type: 'text',
    name: 'name',
    message: '输入icon文件名称',
    validate: value => {
      if (value === '') {
        return '文件名不能为空!';
      }
      if (value.indexOf(' ') > -1) {
        return '文件名不允许存在空格!';
      }
      return true;

    }
  },
  {
    type: 'text',
    name: 'path',
    message: `输入svg代码:(输出地址: ${config.path})`,
    validate: value => {
      if (value === '') {
        return 'svg代码不能为空!';
      }
      return true;
    }
  },
]

export {
  initPrompts,
  addIconPrompts
}