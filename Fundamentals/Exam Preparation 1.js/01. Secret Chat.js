function secretChat(input){
    
    let message = input.shift()

    while (input[0] !== 'Reveal'){
        let line = input.shift()
        line = line.split(":|:")
        let command = line[0]
        if (command === 'InsertSpace'){
            let index = line[1]
            let firstHalf = message.substring(0, index)
            let secondHalf = message.substring(index)
            message = firstHalf + ' ' + secondHalf
            console.log(message)
        } else if (command === 'Reverse'){
            let substring = line[1]
            if (!message.includes(substring)){
                console.log("error")
            } else {
                let index = message.indexOf(substring)
                message = message.split("")
                let cutted = message.splice(index, substring.length).reverse()
                for (let el of cutted){
                    message.push(el)
                }
                message =  message.join("")
                console.log(message)
            }
        } else if (command === 'ChangeAll'){
            let occurences = line[1]
            let replacement = line[2]
            for (let letter of message){
                message = message.replace(occurences, replacement)
            }
            console.log(message)
        }
    }
    console.log(`You have a new text message: ${message}`)

}
secretChat([
'heVVodar!gniV',
'ChangeAll:|:V:|:l',
'Reverse:|:!gnil',
'InsertSpace:|:5',
'Reveal'])