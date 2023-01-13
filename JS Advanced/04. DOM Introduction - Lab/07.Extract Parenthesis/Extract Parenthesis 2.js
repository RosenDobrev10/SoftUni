function sumTable() {
    const pattern = /\(.+?\)/g;
    const text = document.getElementById("content");
    return Array.from(text.textContent.matchAll(pattern)).join(";");
}
