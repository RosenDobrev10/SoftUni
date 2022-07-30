function biggestOf3Numbers(num1, num2, num3) {
    
    let biggestNumber = Number.MIN_SAFE_INTEGER
    if (num1 > biggestNumber){
        biggestNumber = num1
    }
    if (num2 > biggestNumber){
        biggestNumber = num2
    }
    if (num3 > biggestNumber){
        biggestNumber = num3
    }
    console.log(biggestNumber)
}
biggestOf3Numbers(-2, 7, 3);
biggestOf3Numbers(130, 5, 99)
biggestOf3Numbers(43, 43.2, 43.1)
biggestOf3Numbers(2, 2, 2)
