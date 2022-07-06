function city(city) {

  let props = Object.keys(city);  // масивите с ключове се кръщават props(properties)

  for (let prop of props){          // Минаваме по всяко свойство от всички свойства 
      console.log(`${prop} -> ${city[prop]}`)   // Печатаме свойството и след това всяка стойност от обекта 
  }
}
//city({ name: "Sofia", area: 492, population: 1238438, country: "Bulgaria", postCode: "1000"});
city({ name: "Plovdiv", area: 389, population: 1162358, country: "Bulgaria", postCode: "4000"});
