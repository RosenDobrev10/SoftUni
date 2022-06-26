function browserHistory(object, arr){

    for (let command of arr){                       // Минаваме по командите в масива 
        let firstWord = command.split(" ")[0]       // Взимаме първата дума от нулевия индекс на командата 
        let site = command.split(" ")[1]            // Взимаме сайта от първия индекс на командата

        switch(firstWord){          // Проверяваме по първа дума 

            case "Open":
                object['Open Tabs'].push(site)          // Към масива с отворени табове добавяме сайта 
                object['Browser Logs'].push(command)    // към масива с логове добавяме командата 
                break;

            case "Close":
                if (object['Open Tabs'].includes(site)){    // Ако в отворените табове го има сайта 
                    object['Browser Logs'].push(command)    // към масива с логове добавяме командата 
                    object['Recently Closed'].push(site)    // към масива с наскоро затворени, добавяме затворения сайт 
                    let index = object['Open Tabs'].indexOf(site)   // намираме индекса на сайта в отворените табове
                    object['Open Tabs'].splice(index,1)     // Изтриваме сайта от отворените табове
                }
                break;

            case "Clear":  
                object['Open Tabs'] = [];       // Зануляваме масивите 
                object['Recently Closed'] = []; // Зануляваме масивите
                object['Browser Logs'] = [];    // Зануляваме масивите
                break;
        }
    }

    console.log(object['Browser Name'])
    console.log(`Open Tabs: ${(object['Open Tabs']).join(", ")}`)
    console.log(`Recently Closed: ${(object['Recently Closed']).join(", ")}`)
    console.log(`Browser Logs: ${(object['Browser Logs']).join(", ")}`)
}
browserHistory({"Browser Name":"Mozilla Firefox",
"Open Tabs":["YouTube"],
"Recently Closed":["Gmail",
"Dropbox"],
"Browser Logs":["Open Gmail",
"Close Gmail", "Open Dropbox",
"Open YouTube", "Close Dropbox"]},
["Open Wikipedia", "Clear History and Cache", "Open Twitter"])