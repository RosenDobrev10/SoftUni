function magicMatrices(matrix){

    let isMagical = true

    for (let row = 0; row < matrix.length - 1; row++){
        let sumRowOne = matrix[row].reduce((a,b) => a + b, 0)
        let sumRowTwo = matrix[row + 1].reduce((a,b) => a + b, 0)
        let sumColOne = 0
        let sumColTwo = 0

        for (let col = 0; col < matrix.length; col++) {
            sumColOne += matrix[row][col]
            sumColTwo += matrix[row + 1][col]
        }

        if (sumRowOne !== sumRowTwo || sumColOne !== sumColTwo){
            isMagical = false
        }
    }
    console.log(isMagical)
}
magicMatrices([
    [4, 5, 6],

    [6, 5, 4],
    
    [5, 5, 5]])

magicMatrices([
    [11, 32, 45], 
    [21, 0, 1], 
    [21, 1, 1]])

magicMatrices([
    [1, 0, 0], 
    [0, 0, 1], 
    [0, 1, 0]])