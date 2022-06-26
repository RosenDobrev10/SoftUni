function deserializeString(input) {

    let result = [];

    while (input[0] !== "end") {
        let [letter, indexes] = input.shift().split(`:`);
        indexes = indexes.split(`/`);

        indexes.forEach(index => { index = Number(index);
            for (let a = 0 ; a <= index ; a++){
                if (a === index) {
                    result.splice(index, 1, letter);
                } else {
                    result.push("*");
                }
            }

        });
    }

    result = result.filter(el => el !== "*");
    console.log(result.join(``));
}
deserializeString(['a:0/2/4/6', 'b:1/3/5', 'end'])
// deserializeString(['a:0/3/5/11',
// 'v:1/4',
// 'j:2',
// 'm:6/9/15',
// 's:7/13',
// 'd:8/14',
// 'c:10',
// 'l:12',
// 'end'])