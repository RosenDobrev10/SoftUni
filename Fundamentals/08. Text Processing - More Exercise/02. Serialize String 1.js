function serializeString(arr) {
    let chars = {};
    let string = arr[0];
    for (let i = 0; i < string.length; i++) {
        if (!chars[string[i]]) {
            chars[string[i]] = [];
        }
        chars[string[i]].push(i);
    }
    for (let char in chars) {
        console.log(`${char}:${chars[char].join("/")}`);
    }
}
