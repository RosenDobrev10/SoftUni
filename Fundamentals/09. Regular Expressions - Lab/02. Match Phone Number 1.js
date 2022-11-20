function matchPhoneNumber(text){
    const pattern = /\+359([ -])2\1\d{3}\1\d{4}\b/g;
    const result = text[0].match(pattern);
    console.log(result.join(", "));
}
