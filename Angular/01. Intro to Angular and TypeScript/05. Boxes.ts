class Box<T> {
	private boxes: T[] = [];

	add(element: T) {
		this.boxes.push(element);
	}

	remove(): T {
		if (this.boxes.length == 0) {
			throw new Error('You can not remove from empty box. You have to add first.');
		}

		return this.boxes.pop()!;
	}

	get count(): number {
		return this.boxes.length;
	}
}

const box1 = new Box<Number>();
box1.remove()
box1.add(1);
box1.add(2);
box1.add(3);
console.log(box1.count);

let box2 = new Box<String>();
box2.add('Pesho');
box2.add('Gosho');
console.log(box2.count);
box2.remove();
console.log(box2.count);
