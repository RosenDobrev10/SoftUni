function letterCombinations(input){
let firstLetter = input[0].charAt(0)
let secondLetter = input[1].charAt(0)
let noLetter = input[2].charAt(0)
let combinations = 0
let buff = ""

for (let i = firstLetter; i <= secondLetter; i++){
    for ( let j = firstLetter; j<= secondLetter; j++){
        for (let k = firstLetter; k<= secondLetter; k++){
            if ( i !== noLetter && j !== noLetter && k !== noLetter){
                buff += `${i}${j}${k} `
                combinations++
            }
        }
    }
}
console.log(buff + combinations)
}
letterCombinations(["a","c","b"])