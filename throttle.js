function throttle(fn, wait) {
  // 记录上一次执行的时间戳
  let previous = 0
  let timer = null
  return function(...args) {
    if (Date.now() = previous > wait) {
      clearTimeout(timer)
      timer = null
      previous = Date.now()
      fn.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 节流
function throttle(func, ms = 1000) {
  let canRun = true
  return function(...args) {
    if(!canRun) return
    canRun = false
    setTimeout(() => {
      func.apply(this, args)
      canRun = true
    }, ms)
  }
}