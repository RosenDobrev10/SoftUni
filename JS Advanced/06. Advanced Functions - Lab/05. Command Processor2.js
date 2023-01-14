function solution() {
    let result = ''
    return {
        append(string) {
            result += string;
        },
        removeStart(n) {
            result = result.slice(n);
        },
        removeEnd(n) {
            result = result.slice(0, -n);
        },
        print() {
            console.log(result);
        }
    };
}
