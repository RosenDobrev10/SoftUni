function passwordValidator(password) {


    function isLengthEnough(password) {
        return password.length >= 6 && password.length <= 10;
    }


    function isOnlyLettersAndDigits(password) {
        for (let currentCharIndex of password) {
            let currentChar = currentCharIndex.charCodeAt(0);
            if (
                !(currentChar >= 65 && currentChar <= 90) &&
                !(currentChar >= 97 && currentChar <= 122) &&
                !(currentChar >= 48 && currentChar <= 57)
            ) {
                return false;
            }
            }
            return true;
        }


    function isHavingAtLeastTwoDigits(password) {
        let counter = 0;
        for (let charIndex of password) {
            currentChar = charIndex.charCodeAt(0);
            if (currentChar >= 48 && currentChar <= 57) {
                counter++;
            }
        }
        return counter >= 2 ? true : false;
    }


    let isLengthEnoughValid = isLengthEnough(password);
    let isOnlyLettersAndDigitsValid = isOnlyLettersAndDigits(password);
    let isHavingAtLeastTwoDigitsValid = isHavingAtLeastTwoDigits(password);

    if ( isLengthEnoughValid && isOnlyLettersAndDigitsValid && isHavingAtLeastTwoDigitsValid) {
        console.log("Password is valid");
    }

    if (!isLengthEnoughValid) {
        console.log("Password must be between 6 and 10 characters");
    }

    if (!isOnlyLettersAndDigitsValid) {
        console.log("Password must consist only of letters and digits");
    }

    if (!isHavingAtLeastTwoDigitsValid) {
        console.log("Password must have at least 2 digits");
    }
}
//passwordValidator("logIn");
//passwordValidator('MyPass123')
passwordValidator('Pa$s$s')
