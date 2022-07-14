function nonDecreasingSubset(array) {
    let max = Number.MIN_SAFE_INTEGER;
    let arr = array.filter(filterMaxNum);

    function filterMaxNum(num) {
        if (num >= max) {
            max = num;
            return true;
        } else {
        return false;
        }
      }
    console.log(arr.join(" "));
}
nonDecreasingSubset([1, 3, 8, 4, 10, 12, 3, 2, 24]);
nonDecreasingSubset([1, 2, 3, 4]);
nonDecreasingSubset([20, 3, 2, 15, 6, 1]);