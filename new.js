function myNew() {
  const obj = Object.create(null)
  const Constructor = [].shift.call(arguments) // [].slice.call(arguments) 等效于 Array.prototype.slice.call(arguments)
  obj.__proto__ = Constructor.prototype
  const res = Constructor.apply(obj, arguments)
  return typeof res === 'object' || typeof res === 'function' ? res : obj
}

