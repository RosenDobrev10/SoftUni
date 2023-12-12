class Circle {
	private radius: number;
	constructor(radius: number) {
		this.radius = radius;
	}

	getArea(): number {
		return Math.PI * this.radius ** 2;
	}
}

const circle = new Circle(5);
console.log(circle.getArea());
