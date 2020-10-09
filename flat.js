const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]

// 使用 flat Infinity 表示无限层级
const res1 = arr.flat(Infinity)
console.log(res1)

// 使用正则 比较复杂，先要转化成字符串，然后正则替换，再 split 成数组，然后遍历元素转成 number
const reg = /\[|\]/g
const res2 = JSON.stringify(arr).replace(reg, '').split(',').map(item => Number(item))
console.log(res2)

// 使用 reduce, 判断当前元素是不是数组，是的话，则递归  flat，否则就 concat 元素
const myFlat = arr => arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? myFlat(cur) : cur), [])
const res3 = myFlat(arr)
console.log(res3)
