function sumTable() {
    const pattern = /\(.+?\)/g;
    const text = document.getElementById("content");
    return [...text.textContent.matchAll(pattern)].join(";");
}
