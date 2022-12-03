function adAstra(input) {
    const pattern = /([#|])(?<food>[A-Za-z\s]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d+)\1/g;
    let totalCalories = 0;
    const matches = Array.from(input[0].matchAll(pattern));
    matches.forEach(match => totalCalories += Number(match.groups.calories));
    console.log(`You have food to last you for: ${Math.floor(totalCalories / 2000)} days!`);
    matches.forEach(match => console.log(`Item: ${match.groups.food}, Best before: ${match.groups.date}, Nutrition: ${match.groups.calories}`));
}
