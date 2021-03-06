// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

/**
 * var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
 * callback
    用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
      element
        数组中当前正在处理的元素。
      index可选
        正在处理的元素在数组中的索引。
      array可选
        调用了 filter 的数组本身。 
 * 
 * thisArg可选
    执行 callback 时，用于 this 的值。
 * 
 * 返回值
    一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
 * 
 */


Array.prototype.MyFilter = function(callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or undifined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }
  const res  = []
  // 让 obj 成为回调函数的对象传递（强制转换对象）
  const obj = Object(this)
  const len = obj.lenth >>> 0
  for (let i = 0; i < len; i++) {
    if(i in obj) {
      if(callback.call(thisArg, obj[i], i,  obj)) {
        res.push(obj[i])
      }
    }
  }
  return res
}
