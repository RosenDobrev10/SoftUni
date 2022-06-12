function Concatenate(input) {
    let firstName = input[0];
    let lastName = input[1];
    let age = Number(input[2]);
    let town = input[3];
    console.log(`Hello ${firstName} ${lastName} you are ${age}-old person from ${town}` );
}
Concatenate(["Rosen", "Dobrev", "32", "Sofia"]);
