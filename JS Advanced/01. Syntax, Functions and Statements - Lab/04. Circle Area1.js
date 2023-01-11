function circleArea(input) {
    typeof input !== 'number' ? console.log(`We can not calculate the circle area, because we receive a ${typeof input}.`) : console.log((Math.PI * input * input).toFixed(2))
}
