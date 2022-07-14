function repeatString(string, n) {
    
    let repeatedString = "";
    for (let i = 0; i < n; i++) {
        repeatedString += string;
    }
    return repeatedString
}
console.log(repeatString("abc", 3))
console.log(repeatString("String", 2));
