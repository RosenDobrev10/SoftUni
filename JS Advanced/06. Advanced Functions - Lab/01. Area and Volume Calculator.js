function areaAndVolumeCalculator(area, vol, input) {

    const inputArr = JSON.parse(input);         // Парсваме масива с обекти от JSON към масив с обикновени обекти 

    const result = [];                          // Трябва да пазим получените обекти в масив 

    for (let cube of inputArr) {                // Минаваме по всеки обект от инпута 

        const current = {                       // Правим нов текущ обект 
            area: area.call(cube),              // Той има area, която се изчислява на базата на текущия обект от инпута 
            volume: vol.call(cube),             // Той има volume, който се изчислява на базата на текущия обект от инпута
        };

        result.push(current);                   // Създадения обект го бутаме в масива 
    }

    return result;                              // получения масив с новите обекти го връщаме на функцията 
}
areaAndVolumeCalculator(
    area,
    vol,
    `[{"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}]`
);

areaAndVolumeCalculator(
    area,
    vol,
    `[{"x":"10","y":"-22","z":"10"},
    {"x":"47","y":"7","z":"-5"},  
    {"x":"55","y":"8","z":"0"},  
    {"x":"100","y":"100","z":"100"}, 
    {"x":"55","y":"80","z":"250"}]`
);

function area() {
    return Math.abs(this.x * this.y);
}

function vol() {
    return Math.abs(this.x * this.y * this.z);
}
