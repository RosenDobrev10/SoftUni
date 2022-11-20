function extractEmails(input) {
    const pattern = /(?<!\S)[A-Za-z]+([-._]*[A-Za-z]+)*@[A-Za-z]+([-._]*[A-Za-z]+)*\.[A-Za-z]+/g;
    const matches = input.matchAll(pattern);
    for (let match of matches){
        console.log(match[0]);
    }
}
