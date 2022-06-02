function oldBooks(input) {
    let index = 0;
    let favouriteBook = input[index++];
    let countBook = 0;
    let currentBook = input[index++];

    while (currentBook !== "No More Books") {
        if (currentBook === favouriteBook) {
            break;
        }
        countBook++;
        currentBook = input[index++];
    }
    if (currentBook !== favouriteBook) {
        console.log("The book you search is not here!");
        console.log(`You checked ${countBook} books.`);
    } else {
        console.log(`You checked ${countBook} books and found it.`);
    }
}
oldBooks(["Bourne","True Story","Forever","More Space","The Girl",
"Spaceship","Strongest","Profit","Tripple","Stella","The Matrix","Bourne",]);