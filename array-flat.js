let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];


// flat
arr = arr.flat(Infinity);

// 转化成字符串
arr = arr.toString().split(',').map(item => parseFloat(item));
arr = JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(item=>parseFloat(item));

// 手动实现 flat
function myFlat(arr) {
  let newArr = []
  const cycleArray = (arr) => {
    for(let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (Array.isArray(item)) {
        cycleArray(item);
        continue;
      } else {
        newArr.push(item);
      }
    }
  }
  cycleArray(arr);
  return newArr;
}

// reduce
const myFlat = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur);
  }, []);
};