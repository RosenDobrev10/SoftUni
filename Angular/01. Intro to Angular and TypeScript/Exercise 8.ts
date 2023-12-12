class Book {
	constructor(
		private title: string,
		private author: string,
		private price: number
	) {
		this.title = title;
		this.author = author;
		this.price = price;
	}

	getBookInfo(): string {
		return `${this.title} by ${this.author} costs ${this.price}`;
	}

	get bookInfo(): string {
		return `${this.title} by ${this.author} costs ${this.price}`;
	}
}

const books = [new Book('A', 'B', 10),new Book('A', 'B', 10),new Book('A', 'B', 10),new Book('A', 'B', 10)]
console.log(books.map(book => book.getBookInfo()))
console.log(books.map(book => book.bookInfo))
