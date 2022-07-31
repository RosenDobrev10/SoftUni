function sortArray(arr, type) {
    
    return arr.sort((a, b) => (type === "asc" ? a - b : b - a));
}
sortArray([14, 7, 17, 6, 8], "asc");
sortArray([14, 7, 17, 6, 8], "desc");
