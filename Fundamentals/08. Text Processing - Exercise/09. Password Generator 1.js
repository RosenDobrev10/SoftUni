function passwordGenerator(arr) {
    let vowels = ["a", "e", "i", "o", "u"];
    let [firstHalf, secondHalf, word] = arr;
    let password = firstHalf.toLowerCase() + secondHalf.toLowerCase();
    word = word.toUpperCase();
    let counter = 0;
    for (let letter of password) {
        if (vowels.includes(letter)) {
            password = password.replace(letter, word[counter]);
            counter === word.length - 1 ? counter = 0 : counter++;
        }
    }
    console.log(`Your generated password is ${password.split("").reverse().join("")}`);
}
