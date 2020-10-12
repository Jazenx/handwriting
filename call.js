// Function.prototype.call
Function.prototype.myCall = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }
  const fn = Symbol('fn')
  context[fn] = this
  const res  = context[fn](...args)
  delete context[fn]
  return res
}