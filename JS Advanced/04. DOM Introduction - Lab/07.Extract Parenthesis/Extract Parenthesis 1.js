function extract(content) {

    const text = document.getElementById(content).textContent;
    let result = "";

    const pattern = /\((.+?)\)/g;
    let match = pattern.exec(text);
    
    while (match !== null) {
        result += match[1] + "; ";
        match = pattern.exec(text);
    }

    return result;
}
