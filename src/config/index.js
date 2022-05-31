/**
 * 全局配置
 * 根据项目需要进行配置
 * 
 * 安卓项目需修改 type 字段为 “android”
 * 
 */
const config = {
  /**
   * 配置当前生效端
   * 
   * value: web | android
   * 
   * default: web
   */
  type: "web",

  /**
   * 配置项目绝对路径
   * 
   * web端为项目根目录即可
   * 
   * android端为 TODO:
   * 
   * 拿到局对路径操作：1.cd 到项目根目录 2.pwd
   */
  __dirname: './',

  /**
   * 项目默认启动端口号
   * 目前暂未使用
   */
  port: 8001,

  /**
   * icon 配置参数
   */
  iconProps: {
    /**
     * icon 生成位置
     * ⚠️注意：结尾请加上'/'
    */
    path: './',

    /**
     * icon 统一导出路径
     * 若不需导出，请设置为空
    */
    exportPath: '',

    /** 生成扩展名 */
    defaultExtension: '.js',

    /** 文件名长度限制 */
    fileNameLength: 20
  }
};

export { config };
