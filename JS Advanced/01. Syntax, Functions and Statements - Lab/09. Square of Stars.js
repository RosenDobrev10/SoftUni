function squareOfStars(size = 5) {
    
    for (let i = 0; i < size; i++) {
        let output = "";
        for (let i = 0; i < size; i++) {
            output += "*" + " ";
        }
        console.log(output);
    }
}
squareOfStars(7);
squareOfStars();
