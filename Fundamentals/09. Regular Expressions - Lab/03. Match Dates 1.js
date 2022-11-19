function matchDates(text){
    const pattern = /(?<day>\d{2})([-./])(?<month>[A-Z][a-z]{2})\2(?<year>\d{4})/g;
    let matches = text[0].matchAll(pattern);
    for (let match of matches){
        console.log(`Day: ${match.groups.day}, Month: ${match.groups.month}, Year: ${match.groups.year}`);
    }
}
