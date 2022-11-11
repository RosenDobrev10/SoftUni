function countStringOccurrences(text, searchedWord) {
    console.log((text.split(" ").filter(word => word === searchedWord).length));
}
