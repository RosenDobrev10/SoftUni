function requestValidator(obj) {
    
    const validMethods = ["GET", "POST", "DELETE", "CONNECT"];              // Правим масив с валидните ни методи 
    const validVersions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"]; // Правим масив с валидните ни версии 
    const uriRegex = /^[\w.]+$/g;                                           // Създаваме регекс за uri
    // Може да съдържа всички букви, цифри, празни места и точки и да е безкрайно дълго 
    const messageRegex = /^[^<>\\&\'\"]+$/g;
    // Може да съдържа всички символи без < > \ & ' "

    if (!(obj.hasOwnProperty("method") && validMethods.includes(obj.method))) { 
        // Проверяваме имаме ли method като пропърти на обекта и дали този метод е един от валидните ни, АКО НЕ 
        throw new Error("Invalid request header: Invalid Method");  // Хвърляме грешка 
    }

    if (!(obj.hasOwnProperty("uri") && (obj.uri === "*" || uriRegex.test(obj.uri)))) {
        // Проверяваме имаме ли uri като пропърти на обекта и дали стойността му е * или валиден като го проверим през регекса, АКО НЕ 
        throw new Error("Invalid request header: Invalid URI");     // Хвърляме грешка
    }

    if (!(obj.hasOwnProperty("version") && validVersions.includes(obj.version))) {
        // Проверяваме имаме ли version като пропърти на обекта и дали тази версия е една от валидните ни, АКО НЕ
        throw new Error("Invalid request header: Invalid Version"); // Хвърляме грешка
    }


    if (!(obj.hasOwnProperty("message") &&(obj.message === "" || messageRegex.test(obj.message)))) {
        // Проверяваме имаме ли message като пропърти на обекта и дали стойността му е празен стринг или валиден като го проверим през регекса, АКО НЕ 
        throw new Error("Invalid request header: Invalid Message"); // Хвърляме грешка
    }

    return obj;         // Ако няма грешка през 4-те провери, връщаме получения обект 
}
