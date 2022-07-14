function matchFullName(input) {

    let pattern = /\b[A-Z][a-z]+[ ][A-Z][a-z]+\b/g; // Търсим две имена, започващи с главна буква, после много малки букви и да има разстояние между тях
    let validNames = [];                            // Правим масив, в който да ги трупаме
    let validName = pattern.exec(input);            // Създаваме си променлива с първото валидно име

    while (validName !== null) {            // Ако има валидно име, въртим цикъла
        validNames.push(validName[0]);      // Взимаме променливата от нулевия индекс на exec. и я добавяме в масива
        validName = pattern.exec(input);    // Подменяме променливата в цикъла
    }

    console.log(validNames.join(" "));      // Печатаме елементите на масива разделени с интервал 
}
matchFullName("Ivan Ivanov, Ivan ivanov, ivan Ivanov, IVan Ivanov, Test Testov, Ivan Ivanov");
