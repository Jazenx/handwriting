const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

// set
const res1 = Array.from(new Set(arr))
console.log(res1)

// map
const unique = arr =>  {
  const map = new Map()
  const res  = []
  for (let i = 0; i < arr.length; i++) {
    if(!map.has(arr[i])) {
      map.set(arr[i], '')
      res.push(arr[i])
    }
  }
  return res
}
