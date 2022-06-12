function streamOfLetters(input) {
    let index = 0;
    let command = input[index++];
    let word = "";
    let c = 0;
    let o = 0;
    let n = 0;
    buff = "";

    while (command !== "End") {
        letter = command;
        if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
            switch (letter) {
                case "c":
                    if (c > 0) {
                        word += letter;
                    }
                    c++;
                    break;
                case "o":
                    if (o > 0) {
                        word += letter;
                    }
                    o++;
                    break;
                case "n":
                    if (n > 0) {
                        word += letter;
                    }
                    n++;
                    break;
                default:
                    word += letter;
            }
        }
        if (c > 0 && o > 0 && n > 0) {
            buff += word + " ";
            c = 0;
            o = 0;
            n = 0;
            word = "";
        }
        command = input[index++];
    }
    console.log(buff);
}
streamOfLetters(["H","n","e","l","l","o","o","c","t","c","h","o","e","r","e","n","e","End",]);
