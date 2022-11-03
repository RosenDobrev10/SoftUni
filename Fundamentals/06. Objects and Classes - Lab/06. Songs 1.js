function songs(arr) {
    class Song {
        constructor(type, name, time) {
            this.type = type;
            this.name = name;
            this.time = time;
        }
    }
    let songs = []
    let numberOfSongs = arr.shift()
    for (let i = 0; i < numberOfSongs; i++) {
        let [type, name, time] = arr[i].split("_")
        songs.push(new Song(type, name, time))
    }
    let typeList = arr.pop()
    if (typeList === 'all') {
        songs.forEach(song => console.log(song.name))
    } else {
        let filtered = songs.filter(song => song.type === typeList)
        filtered.forEach(song => console.log(song.name))
    }
}
