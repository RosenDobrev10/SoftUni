(function stringExtension() {                           // Това е IIFE - Immediately invoked function expression

    String.prototype.ensureStart = function (str) {     // Създаваме метод към прототипа на String с име ensureStart
        if (this.startsWith(str)) {                     // Ако нашият стринг(this) започва с подадения стринг         
            return this.toString();                     // Връщаме нашият стринг прекаран през toString(), за да е друг не същия 
        }
        return str + this;                              // Връщаме подадения стринг + нашият(Няма нужа от toString())
    };

    String.prototype.ensureEnd = function (str) {       // Създаваме метод към прототипа на String с име ensureEnd
        if (this.endsWith(str)) {                       // Ако нашият стринг(this) завършва с подадения стринг 
            return this.toString();                     // Връщаме нашият стринг прекаран през toString(), за да е друг не същия
        }
        return this + str;                              // Връщаме нашият + подадения стринг(Няма нужа от toString())
    };

    String.prototype.isEmpty = function () {            // Създаваме метод към прототипа на String с име isEmpty
        return this.length === 0;                       // Връщаме true или false от проверката дали дължината на стринга е 0 
    };

    String.prototype.truncate = function (n) {          // Създаваме метод към прототипа на String с име truncate
        if (this.length <= n) {                          // Ако дължината на стринга е по-малка или равна на n 
            return this.toString();                     // Връщаме нашият стринг прекаран през toString(), за да е друг не същия
        }

        if (n < 4) {                                    // Ако n e по-малко от 4 
            return ".".repeat(n);                       // Връщаме толкова точки, колкото е n 
        } else {                                        // Ако n e 4 или повече
            let lastIndex = this.substring(0, n - 2).lastIndexOf(" ");  // Махаме 2 символа от стринга и тогава търсим интервал, за да се подсигурим, че ще сме в големината на стринга 
            if (lastIndex !== -1) {                         // Ако намерим интервал в стринга
                return this.substring(0, lastIndex) + "..."; // Режем стринга до последния индекс където сме намерили интервал и добавяме ...
            } else {                                        // Ако не намерим интервал в стринга 
                return this.substring(0, n - 3) + "...";    // Махаме последните 3 символа и ги заменяме с ... 
            }
        }
    };

    String.format = function (string, ...params) {      // Създаваме метод към String обекта с име format(НЕ КЪМ ПРОТОТИПА)
        params.forEach((param, index) => {              // Минаваме по всички параметри и създаваме индекс с начална стойност 0 
            string = string.replace(`{${index}}`, param);     // Заменяме всяка почва на ${0}, ${1} и т.н с параметъра и презаписваме стойността на string 
        });
        return string;                                  // Накрая връщаме стринга 
    };
})()                                                    // Това е IIFE - Immediately invoked function expression
