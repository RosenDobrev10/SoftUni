function extractEmails(input) {

    input = input.split(" ");       // Правим стринга на масив, за да обходим всяка дума от него 

    for (let word of input) {       // Минаваме по всяка дума от масива 
        let pattern = /(?<!\S)[A-Za-z]+([\.\-\_]*[A-Za-z]+)*@[A-Za-z]+([\.\-\_]*[A-Za-z]+)*(\.[A-Za-z]+)/g;
        let match = pattern.exec(word);     // Взимаме съвпадението 
        if (match !== null) {               // Ако не е null
            console.log(match[0]);          // Печатаме на нулевия индекс, се намира самото съвпадение 
        }
    }
}
extractEmails("Please contact us at: support@github.com.");
extractEmails("Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.");
extractEmails("Many users @ SoftUni confuse email addresses. We @ Softuni.BG provide high-quality training @ home or @ class. –- steve.parker@softuni.de.");