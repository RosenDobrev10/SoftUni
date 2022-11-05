function convertToObject(string) {
    const obj = JSON.parse(string);
    for (let key in obj) {
        console.log(`${key}: ${obj[key]}`);
    }
}
