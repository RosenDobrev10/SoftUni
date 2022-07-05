function pieceOfPie(array, start, end) {

    const startIndex = array.indexOf(start);
    const endIndex = array.indexOf(end);
    const newArray = array.slice(startIndex, endIndex + 1);
    return newArray;
}
pieceOfPie(
["Pumpkin Pie",
"Key Lime Pie",
"Cherry Pie",
"Lemon Meringue Pie",
"Sugar Cream Pie",],

"Key Lime Pie",
"Lemon Meringue Pie");
