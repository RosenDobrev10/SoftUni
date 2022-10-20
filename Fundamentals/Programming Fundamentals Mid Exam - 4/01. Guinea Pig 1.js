function guineaPig(arr) {
    let [food, hay, cover, weight] = arr.map(Number).map((x) => x * 1000);
    for (let i = 1; i <= 30; i++) {
        food -= 300;
        i % 2 === 0 ? (hay -= food * 0.05) : null;
        i % 3 === 0 ? (cover -= weight / 3) : null;
        if (food <= 0 || hay <= 0 || cover <= 0) {
            return console.log("Merry must go to the pet store!");
        }
    }
    console.log(`Everything is fine! Puppy is happy! Food: ${(food / 1000).toFixed(2)}, Hay: ${(hay / 1000).toFixed(2)}, Cover: ${(cover / 1000).toFixed(2)}.`);
}
