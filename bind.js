Function.prototype.myBind = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new TypeError('Type Error')
  }
  // 保存 this 值
  const self = this
  return function F() {
    // 考虑 new 情况
    if (this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, [...args, ...arguments])
  }
}