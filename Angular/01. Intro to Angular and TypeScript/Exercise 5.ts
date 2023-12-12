function filterNumbers(numbers: number[]): number[] {
	return numbers.filter((number) => number % 2 == 0);
}

console.log(filterNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
