function phoneBook(arr) {
    let phonebook = {};
    arr.forEach((line) => {
        let [name, phoneNumber] = line.split(" ");
        phonebook[name] = phoneNumber;
    });
    for (let name in phonebook) {
        console.log(`${name} -> ${phonebook[name]}`);
    }
}
