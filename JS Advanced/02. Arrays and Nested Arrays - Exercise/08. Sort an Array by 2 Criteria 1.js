function sortAnArrayBy2Criteria(array){

    array.sort(sortingFunction)
    console.log(array.join("\n"))

   function sortingFunction(a, b){
        if (a.length === b.length){
            return a.localeCompare(b)
        }
        return a.length - b.length
    }
}
sortAnArrayBy2Criteria(['alpha','beta','gamma'])
sortAnArrayBy2Criteria(['Isacc', 'Theodor','Jack', 'Harrison', 'George'])
sortAnArrayBy2Criteria(['test', 'Deny','omen', 'Default'])