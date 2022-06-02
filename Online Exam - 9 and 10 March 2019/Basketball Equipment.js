function basketballEquipment(input) {
    let yearTax = Number(input[0]);
    let sneakers = 0.6 * yearTax;
    let outfit = 0.8 * sneakers;
    let ball = 0.25 * outfit;
    let accessories = 0.2 * ball;
    let all = accessories + ball + outfit + sneakers + yearTax;
    console.log(all.toFixed(2));
}
basketballEquipment(["320"]);
