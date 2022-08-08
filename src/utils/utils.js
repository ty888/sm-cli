/**
 * 根据 type 执行函数
 * type: web | android
 */
function runFn(type = 'web') {
  const fns = {}
  const self = {
    when: (type, fn) => {
      fns[type] = fn
      return self
    },
    run: (...parms) => {
      if (fns[type]) {
        return fns[type](...parms)
      }
      throw new Error(`没有找到${type}的Fn`)
    }
  }
  return self
}

export {
  runFn
}