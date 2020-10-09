function debounce(fn, wait, immediate) {
  let timer = null
  return function(...args) {
    // 每次触发事件都要取消之前的定时器
    clearTimeout(timer)
    // 判断是否要立即执行一次
    if(immediate && !timer) {
      fn.apply(this, args)
    }
    // setTimeout中使用箭头函数，就是让 this 指向 返回的该闭包函数，而不是 debounce 函数的调用者
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 防抖
function debounce1(fn, wait, immediate) {
  let timer = null
  return function(...args) {
    // 重置定时器
    if (timer) clearTimeout(timer) 
    // 是否要立即执行一次
    if (immediate && !timer) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

debounce1(() => {
  console.log('1')
}, 1000)