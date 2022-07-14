function censoredWords(text, word){

    let tokens = text.split(word);                       // Делим изречението на масив, на елементи, там където е думата 
    console.log(tokens.join('*'.repeat(word.length)));   // след това съединяваме по броя звездички на дължината на думата 

}
//censoredWords('A small sentence with some words','small')
censoredWords('Find the hidden word', 'hidden')