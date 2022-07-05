function TimePlus15Minutes(input) {
  let hours = Number(input[0]);
  let minutes = Number(input[1]);

  let timeInMin = hours * 60 + minutes;
  let newTimeInMin = timeInMin + 15;
  let finalHour = Math.floor(newTimeInMin) / 60;
  let finalMinutes = newTimeInMin % 60;

  if (finalHour >= 24) {
    finalHour -= 24;
  }
  if (finalMinutes < 10) {
    console.log(`${Math.floor(finalHour)}:0${finalMinutes}`);
  } else {
    console.log(`${Math.floor(finalHour)}:${finalMinutes}`);
  }
}
TimePlus15Minutes(["23", "44"]);
