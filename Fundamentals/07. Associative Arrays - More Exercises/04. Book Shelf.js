function bookShelf(input) {

    let library = {};
 
    for (let line of input) {
        if (line.includes('->')) {
            let [id, genre] = line.split(' -> ');
 
            if (!library.hasOwnProperty(id)) {
                library[id] = { [genre]: [] };
            }
        } else {
            let [bookInfo, genre] = line.split(', ');
 
            for (let key in library) {
                if (library[key].hasOwnProperty(genre)) {
                    library[key][genre].push(bookInfo);
                    break;
                }
            }
            
        }
    }
 
    Object.keys(library).sort((a, b) => Object.entries(library[b])[0][1].length - Object.entries(library[a])[0][1].length)
        .forEach(id => {
            console.log(`${id} ${Object.keys(library[id])}: ${Object.values(library[id])[0].length}`);
            Object.values(library[id]).forEach(values => {
                values.sort((a, b) => a.localeCompare(b)).forEach(v => {
                    console.log(`--> ${v}`);
                });
            });
        });
}
bookShelf([
'1 -> mystery', 
'2 -> sci-fi',
'Child of Silver: Bruce Rich, mystery',
'Lions and Rats: Gabe Roads, history',
'Effect of the Void: Shay B, romance',
'Losing Dreams: Gail Starr, sci-fi',
'Name of Earth: Jo Bell, sci-fi'])