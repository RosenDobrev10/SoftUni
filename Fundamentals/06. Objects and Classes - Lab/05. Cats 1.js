function cats(arr) {
    class Cat {
        constructor(name, age) {
            (this.name = name);
            (this.age = age);
        }
        meow() {
            return `${this.name}, age ${this.age} says Meow`;
        }
    }

    for (let line of arr) {
        let [name, age] = line.split(" ");
        age = Number(age);
        let cat = new Cat(name, age);
        console.log(cat.meow())
    }
}
