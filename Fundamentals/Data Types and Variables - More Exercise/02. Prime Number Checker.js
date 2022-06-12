function primeNumberChecker(number) {
  if (number === 0 || number === 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
primeNumberChecker(7);
primeNumberChecker(8);
primeNumberChecker(81);
