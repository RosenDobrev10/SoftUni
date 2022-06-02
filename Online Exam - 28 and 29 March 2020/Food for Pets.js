function foodForPets(input) {
    let index = 0;
    let days = Number(input[index++]);
    let allFood = Number(input[index++]);
    let eatenFoodDog = 0;
    let eatenFoodCat = 0;
    let biscuits = 0;

    for (let i = 1; i <= days; i++) {
        let dogFood = Number(input[index++]);
        let catFood = Number(input[index++]);
        eatenFoodDog += dogFood;
        eatenFoodCat += catFood;
        if (i % 3 === 0) {
            biscuits += (dogFood + catFood) * 0.1;
        }
    }
    console.log(`Total eaten biscuits: ${Math.round(biscuits)}gr.`);
    let percentEatenFood = ((eatenFoodCat + eatenFoodDog) / allFood) * 100;
    console.log(`${percentEatenFood.toFixed(2)}% of the food has been eaten.`);
    let percentEatenDog = (eatenFoodDog / (eatenFoodCat + eatenFoodDog)) * 100;
    console.log(`${percentEatenDog.toFixed(2)}% eaten from the dog.`);
    let percentEatenCat = (eatenFoodCat / (eatenFoodCat + eatenFoodDog)) * 100;
    console.log(`${percentEatenCat.toFixed(2)}% eaten from the cat.`);
}
foodForPets(["3", "500", "100", "30", "110", "25", "120", "35"]);
