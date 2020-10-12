// Function.prototype.apply()
// 第一个参数是绑定的this，默认为window，第二个参数是数组或类数组

Function.prototype.myApply = function(context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }
  const fn = Symbol('fn')
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}