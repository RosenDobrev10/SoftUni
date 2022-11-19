function solve(input) {
    let series = input[0].split(/[0-9]+/).filter((x) => x != '');
    let repeaters = input[0].split(/[^0-9]+/).filter((x) => x != '');
    let result = '';
    for (let i = 0; i < series.length; i++) {
        result += series[i].toUpperCase().repeat(repeaters[i]);
    }
    console.log(`Unique symbols used: ${[...new Set(result)].length}`);
    console.log(result);
}
