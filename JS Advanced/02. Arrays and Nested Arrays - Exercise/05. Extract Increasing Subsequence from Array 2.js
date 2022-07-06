function extractIncreasingSubsequencefromArray(array) {

    let result = array.reduce((arr, current) => {
        if (arr.length) {
            if (current >= arr[arr.length - 1]) {
                arr.push(current);
            }
        } else {
            arr.push(current);
        }
        return arr;
    }, []);

    return result;
}
extractIncreasingSubsequencefromArray([1, 3, 8, 4, 10, 12, 3, 2, 24]);
extractIncreasingSubsequencefromArray([1, 2, 3, 4]);
extractIncreasingSubsequencefromArray([20, 3, 2, 15, 6, 1]);
