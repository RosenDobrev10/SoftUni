function modernTimesOfHashTag(text) {
    let textArr = text.split(" ");
    textArr.forEach(word => {
        if (word.startsWith("#") && word.length > 1) {
            let isOnlyLetters = true;
            for (let i = 1; i < word.length; i++) {
                let char = word.toLowerCase().charCodeAt(i);
                if (char < 97 || char > 122) {
                    isOnlyLetters = false;
                    break;
                }
            }
            isOnlyLetters ? console.log(word.substring(1)) : null;
        }
    })
}
