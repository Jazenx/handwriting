function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArr = Array.isArray(target)
    let cloneTarget  = isArr ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    const keys = isArr ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value
      }
      cloneTarget[key] = clone(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}

function forEach(arr, iterater) {
  let i = -1
  const length = arr.length
  while(++index < length) {
    iterater(arr[i], i)
  }
  return arr
}


function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}