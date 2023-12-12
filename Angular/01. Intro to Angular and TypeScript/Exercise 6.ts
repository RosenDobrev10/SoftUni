function findLongestWord(words: string[]): string {
	let longestWord: string = '';
	words.forEach((word) => {
		if (word.length > longestWord.length) {
			longestWord = word;
		}
	});
	return longestWord;
}

console.log(findLongestWord(['air', 'fire', 'water', 'earth']));
