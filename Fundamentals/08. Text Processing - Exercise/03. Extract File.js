function extractFile(string) {

    let words = string.split("\\");                         // Разделяме стринга на масив по \\ 
    let important = words[words.length - 1];               // Взимаме последния елемент, където са името на файла и екстеншъна
    let lastIndexOf = important.lastIndexOf(".");
    // Намираме последния индекс, на който се намира точката, която разделя файла и екстеншъна
    let fileExtension = important.substring(lastIndexOf + 1);   // Екстеншъна започва от следващия символ на точката до края
    let fileName = important.substring(0, lastIndexOf);         // името на файла е от началото до индекса на точката

    console.log(`File name: ${fileName}`);
    console.log(`File extension: ${fileExtension}`);
}
extractFile("C:\\Internal\\training-internal\\Template.blqk.pptx");
//extractFile('C:\\Projects\\Data-Structures\\LinkedList.cs')
