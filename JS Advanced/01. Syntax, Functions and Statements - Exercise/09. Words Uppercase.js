function wordsUppercase(string) {

    let pattern = /\w+/g;                   // Взимаме всяка дума от стринга с \w
    let match = string.match(pattern);      // Изваждаме съвпаденията, като масив
    console.log(match.map((word) => word.toLocaleUpperCase()).join(", "));
    // Минаваме по всяка дума от масива и я правим с големи букви и после съединяваме по запетая и интервал
}
wordsUppercase("Hi, how are you?");
wordsUppercase("hello");
