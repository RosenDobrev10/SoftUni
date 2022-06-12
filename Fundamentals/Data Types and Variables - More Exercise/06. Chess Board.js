function chessBoard(number) {
    let size = Number(number)
    let currentColour = 'black'
    let previousColour = ''
    console.log('<div class="chessboard">')
 
    for (let rows = 1; rows <= size; rows++) {
        console.log('  <div>')
 
        for (let columns = 1; columns <= size; columns++) {
            console.log(`    <span class="${currentColour}"></span>`);
 
            previousColour = currentColour
            currentColour = previousColour === 'black' ? 'white' : 'black'
        }
 
        console.log('  </div>')
        if (size % 2 === 0) {
            previousColour = currentColour
            currentColour = previousColour === 'black' ? 'white' : 'black'
        }
    }
    console.log('</div>')
}
chessBoard(3)
