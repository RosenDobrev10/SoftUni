function extractFile(file) {
    console.log(`File name: ${file.substring(file.lastIndexOf("\\") + 1, file.lastIndexOf("."))}`);
    console.log(`File extension: ${file.substring(file.lastIndexOf(".") + 1)}`);
}
