interface Person {
    name: string;
    age: number;
    email: string;
}

function printPersonInfo(person: Person): void {
    console.log(`Name: ${person.name}`);
    console.log(`Age: ${person.age}`);
    console.log(`Email: ${person.email}`);
  }
  
//   const person: Person = {
//     name: "John Doe",
//     age: 25,
//     email: "johndoe@example.com"
//   };
  
//   printPersonInfo(person);

printPersonInfo({name: 'Rosen', age: 33, email:'rosendobrev@mail.bg'})

