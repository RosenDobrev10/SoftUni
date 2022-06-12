function equalSums(array){

    for (let index = 0; index < array.length; index++){
        let rightSum = 0
        let leftSum = 0
        
        for (let k = index - 1; k < index; k++){
            if (k >=0){
            leftSum += array[k]
            } else {
                leftSum = 0
            }
        }
        for (let j = index + 1; j < array.length; j++){
            if (j >= 0){
            rightSum += array[j]
            } else {
                rightSum = 0
            }
            
        }
        if (leftSum === rightSum){
            console.log(index)
            return
        }
    }
        console.log("no")
    
    

}
equalSums([1, 2, 3, 3])
//equalSums([1, 2])
//equalSums([1])
//equalSums([1, 2, 3])
//equalSums([10, 5, 5, 99,3, 4, 2, 5, 1,1, 4])
