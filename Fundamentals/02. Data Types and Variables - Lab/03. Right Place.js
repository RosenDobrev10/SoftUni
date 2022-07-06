function rightPlace(str, char, result) {
    let replace = str.replace("_", char);
    if (replace === result){
        console.log('Matched')
    } else {
        console.log('Not Matched')
    }
}
rightPlace("Str_ng", "I", "Strong");
rightPlace("Str_ng", "i", "String");