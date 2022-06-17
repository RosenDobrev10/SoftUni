function numbers(numbers){

    let sequence = numbers.split(" ").map(Number).sort((a,b)=> b-a)

    let average = 0
    let sum = 0

    for (let nums of sequence){
        sum += Number(nums)
        average = sum / sequence.length
    }
    
    let aboveAverage = []

    for (let i = 0; i < sequence.length; i++){
        if (sequence[i] > average && aboveAverage.length < 5){
            aboveAverage.push(sequence[i])
        }
    }
    if (aboveAverage.length > 0){
    console.log(aboveAverage.join(" "))
    } else {
        console.log("No")
    }
}
//numbers('10 20 30 40 50')
//numbers('5 2 3 4 -10 30 40 50 20 50 60 60 51')
//numbers('1')
numbers('-1 -2 -3 -4 -5 -6')