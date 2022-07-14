function employees(input){

    let employee = { name : employeeName}

    for (let i = 0; i < input.length; i++){
        employee.name = input[i]
        let personalNum = employee.name.length
        console.log(`Name: ${employee.name} -- Personal Number: ${personalNum}`)
    }
}
employees([

'Silas Butler',
    
'Adnaan Buckley',
    
'Juan Peterson',
    
'Brendan Villarreal'
    
])

// employees([

// 'Samuel Jackson',
    
// 'Will Smith',
    
// 'Bruce Willis',
    
// 'Tom Holland'
    
// ])