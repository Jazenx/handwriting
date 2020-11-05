// 快速排序 分治
// - 从数列中挑出一个元素，称为 “基准”（pivot）；
// - 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// - 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (arr.length <= 1) return arr;
  if (left < right) {
    const pivot_index = partition(arr, left, right);
    quickSort(arr, left, pivot_index - 1);
    quickSort(arr, pivot_index + 1, right);
  }
}

function partition(arr, left, right) {
  let pivot = left;
  let pivot_index = left + 1;
  for (let i = pivot_index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      [arr[i], arr[pivot_index]] = [arr[pivot_index], arr[i]];
      pivot_index++;
    }
  }
  [arr[pivot], arr[pivot_index - 1]] = [arr[pivot_index - 1], arr[pivot]]
  return pivot_index - 1
}

var result = quickSort(arr, 0, arr.length - 1);
