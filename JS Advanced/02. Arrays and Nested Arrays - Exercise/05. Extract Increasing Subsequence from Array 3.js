function extractIncreasingSubsequencefromArray(array){

    let max = Number.MIN_SAFE_INTEGER;

    let result = array.reduce((acc, value) => {
        
        if(value >= max){
            max = value;
            acc.push(max);
        }

        return acc;
    }, [])

    return result;
}
extractIncreasingSubsequencefromArray([1, 3, 8, 4, 10, 12, 3, 2, 24]);
extractIncreasingSubsequencefromArray([1, 2, 3, 4]);
extractIncreasingSubsequencefromArray([20, 3, 2, 15, 6, 1]);
