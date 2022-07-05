function timeToWalk(steps, footprint, speed) {

    let distanceInMeters = steps * footprint;       // Изчисляваме дистанцията в метри като умножаваме броя стъпки по дължината на крачката
    let speedMetersSec = speed / 3.6;               // Превръщаме km/h в m/s като делим на 3.6
    let time = distanceInMeters / speedMetersSec;   // Изчисляваме времето като делим пътя на скоросста
    let rest = Math.floor(distanceInMeters / 500);  // Изчисляваме колко минути ще почива като делим дистанцията в метри на 500

    let timeHour = Math.floor(time / 3600);         // Изчисляваме времето в часове като делим времето в секунди на 3600
    let timeMin = Math.floor(time / 60);            // Изчисляваме времето в минути като делим времето в секунди на 60
    let timeSec = Math.round(time - timeMin * 60);

    console.log(
        (timeHour < 10 ? "0" : "") +
        timeHour +
        ":" +
        (timeMin + rest < 10 ? "0" : "") +
        (timeMin + rest) +
        ":" +
        (timeSec < 10 ? "0" : "") +
        timeSec);
}
timeToWalk(4000, 0.6, 5);
timeToWalk(2564, 0.7, 5.5);
