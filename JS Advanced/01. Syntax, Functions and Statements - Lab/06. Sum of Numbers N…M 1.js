function sumOfNumbersNM(n, m) {
    let result = 0;
    for (let i = +n; i <= +m; i++){
        result += Number(i);
    }
    return result;
}
