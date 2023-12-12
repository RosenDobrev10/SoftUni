function sortNumber(numbers: number[]): number[] {
	return numbers.sort((a, b) => a - b);
}

console.log(sortNumber([1, 5, 22, 2, 6563, 3, 5, 232]))