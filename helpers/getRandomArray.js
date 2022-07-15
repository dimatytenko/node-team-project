const getRandomArray = (arr, limit) => {
  const set = new Set();
  for (_ of Array.from({ length: arr.length }, (_, i) => i)) {
    set.add(arr[Math.floor(Math.random() * arr.length)]);
    if (set.size === limit) {
      break;
    }
  }
  const randomArr = [...set];
  return randomArr;
};

module.exports = getRandomArray;
