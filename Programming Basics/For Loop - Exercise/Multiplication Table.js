function multiplicationTable(input) {
  let sum = 0;
  let n = Number(input[0]);
  for (i = 1; i <= 10; i++) {
    sum = i * n;
    console.log(`${i} * ${n} = ${sum}`);
  }
}
multiplicationTable(["5"]);