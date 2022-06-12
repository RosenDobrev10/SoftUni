function salary(input) {
  let index = 0;
  let tabs = Number(input[index]);
  index++;
  let salary = Number(input[index]);
  index++;

  for (let i = 0; i < tabs; i++) {
    let site = input[index];
    index++;
    if (site === "Facebook") {
      salary -= 150;
    } else if (site === "Instagram") {
      salary -= 100;
    } else if (site === "Reddit") {
      salary -= 50;
    }

    if (salary <= 0) {
      console.log("You have lost your salary.");
      break;
    }
  }
  if (salary > 0) {
    console.log(Math.trunc(salary));
  }
}

salary(["3", "500", "Facebook", "Stackoverflow.com", "softuni.bg"]);
