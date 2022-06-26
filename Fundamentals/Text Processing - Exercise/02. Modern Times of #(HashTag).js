function modernTimesOfHashtag(sentence) {

    let words = sentence.split(" ");                    // Разделяме изречението на отделни думи по интервал

    for (let word of words) {                           // Минаваме по думите от изречението
        if (word.startsWith("#") && word.length > 1) {  // Ако думата започва с # и не е само това по-дълга от един символ
            let isOnlyLetters = true;                   // Приемаме, че думата има само букви

            for (let i = 1; i < word.length; i++) {     // Започваме от първи индекс(без # ) до края на думата
                if (
                    (word.charCodeAt(i) < 65 || word.charCodeAt(i) > 90) && (word.charCodeAt(i) < 97 || word.charCodeAt(i) > 122)) {
                    // Ако намерим символ извън диапазона A-Z и a-Z
                    isOnlyLetters = false;                  // значи, че имаме невалидна дума
                    break;                                  // прекъсваме и не проверяваме натам думата
                }
            }

            if (isOnlyLetters) {                    // Ако в думата има само валидни символи
                console.log(word.substring(1));     // я отпечатваме, като не взимаме нулевия индекс( # )
            }
        }
    }
}
modernTimesOfHashtag("Nowadays everyone uses # to tag a #special word in #socialMedia");
//modernTimesOfHashtag('The symbol # is known #variously in English-speaking #regions as the #number sign)
