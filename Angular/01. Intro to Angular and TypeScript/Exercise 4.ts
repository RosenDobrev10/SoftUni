interface Shape {
	calculateArea(): number;
}

class Rectangle implements Shape {
	width: number;
	heigth: number;
	constructor(width: number, heigth: number) {
		this.width = width;
		this.heigth = heigth;
	}

	calculateArea(): number {
		return this.heigth * this.width;
	}
}

const rectangle = new Rectangle(4, 5);
console.log(rectangle.calculateArea());

class Triangle implements Shape {
	base: number;
	heigth: number;
	constructor(base: number, heigth: number) {
		this.base = base;
		this.heigth = heigth;
	}

	calculateArea(): number {
		return this.heigth * this.base * 0.5;
	}
}

const triangle = new Triangle(4, 5);
console.log(triangle.calculateArea());
