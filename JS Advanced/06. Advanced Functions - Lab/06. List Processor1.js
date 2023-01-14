function listProcessor(arr) {
    const result = [];
    const commands = {
        add(string) {
            result.push(string);
        },
        remove(string) {
            while (result.includes(string)){
                result.splice(result.indexOf(string), 1)
            }
        },
        print() {
            console.log(result.join(","));
        },
    };
    arr.forEach(line => {
        const [command, param] = line.split(" ");
        commands[command](param);
    });
}
