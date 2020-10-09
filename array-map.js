Array.prototype.myMap = function(callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or undefined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }
  const res = []
  const obj = Object(this)
  const len = obj.length >>> 0
  for(let i = 0; i < len; i++) {
    if (i in obj) {
      res[i] = callback.call(thisArg, obj[i], i, this)
    }
  }
  return res
}