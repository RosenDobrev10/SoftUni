function CelsiusToFahrenheit(input) {
    let Celsius = Number(input[0]);
    let Fahrenheit = Celsius * 1.8 + 32;
    console.log(Fahrenheit.toFixed(2));
}
CelsiusToFahrenheit(["25"]);
