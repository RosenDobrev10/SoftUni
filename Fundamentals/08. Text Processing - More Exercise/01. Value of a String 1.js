function valueOfAString(arr) {
    let [string, type] = arr;
    let sum = 0;
    for (let letter of string) {
        if (type === 'LOWERCASE' && letter.charCodeAt() >= 97 && letter.charCodeAt() <= 122) {
            sum += letter.charCodeAt();
        } else if (type === 'UPPERCASE' && letter.charCodeAt() >= 65 && letter.charCodeAt() <= 90) {
            sum += letter.charCodeAt();
        }
    }
    console.log(`The total sum is: ${sum}`);
}
