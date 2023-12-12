abstract class Melon {
	weight: number;
	melonSort: string;
	_elementIndex: number;
	_element: string[] = ['Water', 'Fire', 'Earth', 'Air'];

	constructor(weight: number, melonSort: string) {
		this.weight = weight;
		this.melonSort = melonSort;
		this._elementIndex = this.elementIndex;
		this._element = this.element;
	}

	get element(): string[] {
		return this._element;
	}

	get elementIndex(): number {
		return this.weight * this.melonSort.length;
	}

	toString(): string {
		return `“Element: ${this._element[0]}”
“Sort: ${this.melonSort}”
“Element Index: ${this._elementIndex}”`;
	}
}

class Watermelon extends Melon {
	constructor(weight: number, melonSort: string) {
		super(weight, melonSort);
	}

	get element(): string[] {
		return ['Water'];
	}
}

class Firemelon extends Melon {
	constructor(weight: number, melonSort: string) {
		super(weight, melonSort);
	}

	get element(): string[] {
		return ['Fire'];
	}
}

class Earthmelon extends Melon {
	constructor(weight: number, melonSort: string) {
		super(weight, melonSort);
	}

	get element(): string[] {
		return ['Earth'];
	}
}

class Airmelon extends Watermelon {
	constructor(weight: number, melonSort: string) {
		super(weight, melonSort);
	}

	get element(): string[] {
		return ['Air'];
	}
}

class Melolemonmelon extends Melon {
	constructor(weight: number, melonSort: string) {
		super(weight, melonSort);
	}

	get element() {
		return this._element;
	}

	set element(value: string[]) {
		this._element = value;
	}

	morph() {
		const currentElement = this.element.shift();
		this.element.push(currentElement!);
        this.melonSort = this.element[0]
	}
}

const watermelon: Watermelon = new Watermelon(22, 'Honeydew');
console.log(watermelon.element[0]);
console.log(watermelon.elementIndex);
console.log(watermelon.toString());

const firemelon: Firemelon = new Firemelon(19, 'Sparkles');
console.log(firemelon.element[0]);
console.log(firemelon.elementIndex);
console.log(firemelon.toString());

const earthmelon: Earthmelon = new Earthmelon(16, 'Europea');
console.log(earthmelon.element[0]);
console.log(earthmelon.elementIndex);
console.log(earthmelon.toString());

const airmelon: Airmelon = new Airmelon(13, 'Casper');
console.log(airmelon.element[0]);
console.log(airmelon.elementIndex);
console.log(airmelon.toString());

const melolemonmelon: Melolemonmelon = new Melolemonmelon(10, 'Nonsense');
console.log(melolemonmelon.element[0]);
console.log(melolemonmelon.elementIndex);
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.element[0]);
console.log(melolemonmelon.elementIndex);
melolemonmelon.morph();
console.log(melolemonmelon.element[0]);
console.log(melolemonmelon.elementIndex);
melolemonmelon.morph();
console.log(melolemonmelon.element[0]);
console.log(melolemonmelon.elementIndex);
melolemonmelon.morph();
console.log(melolemonmelon.element[0]);
console.log(melolemonmelon.elementIndex);
melolemonmelon.morph();