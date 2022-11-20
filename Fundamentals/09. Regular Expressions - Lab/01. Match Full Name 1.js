function matchFullName(text){
    const pattern = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    const matches = text.match(pattern);
    console.log(matches.join(" "));
}
