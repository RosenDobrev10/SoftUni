function adressBook(arr) {
    let adressBook = {};
    arr.forEach((line) => {
        let [name, adress] = line.split(":");
        adressBook[name] = adress;
    });
    let sorted = Object.entries(adressBook).sort((a, b) => a[0].localeCompare(b[0]));
    for (let [person, adress] of sorted) {
        console.log(`${person} -> ${adress}`);
    }
}
