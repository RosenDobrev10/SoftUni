class KeyValuePair<T, U> {
	private key: T;
	private value: U;

	setKeyValue(key: T, value: U): void {
		this.key = key;
		this.value = value;
	}

	display(): void {
		console.log(`key = ${this.key}, value = ${this.value}`);
	}
}

const kvp1 = new KeyValuePair<number, string>();
kvp1.setKeyValue(1, 'Steve');
kvp1.display();

const kvp2 = new KeyValuePair<string, boolean>();
kvp2.setKeyValue('isValid', true);
kvp2.display();

const kvp3 = new KeyValuePair<string, string[]>();
kvp3.setKeyValue('cities', ['Sofia', 'Varna', 'Plovdiv']);
kvp3.display();
