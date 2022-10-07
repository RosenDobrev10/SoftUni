function passwordValidator(pass) {

    function isLengthCorrect(text) {
        return text.length >= 6 && text.length <= 10;
    }

    function isOnlyLettersAndDigits(text) {
        let lettersAndDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
        for (let char of text) {
            if (!lettersAndDigits.includes(char)) {
                return false;
            }
        }
        return true;
    }

    function atLeastTwoDigits(text) {
        let count = 0;
        let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (let char of text) {
            if (digits.includes(char)) {
                count++;
            }
        }
        return count >= 2;
    }

    if (isLengthCorrect(pass) && isOnlyLettersAndDigits(pass) && atLeastTwoDigits(pass)) {
        return console.log("Password is valid");
    }

    !isLengthCorrect(pass) ? console.log("Password must be between 6 and 10 characters") : null;
    !isOnlyLettersAndDigits(pass) ? console.log("Password must consist only of letters and digits") : null;
    !atLeastTwoDigits(pass) ? console.log("Password must have at least 2 digits") : null;
}
