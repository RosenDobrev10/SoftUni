function extendPrototype(classToExtend) {

    classToExtend.prototype.species = "Human";                 // Достъпваме прототипа на получения клас и добавяме свойство, с неговата стойност 
    classToExtend.prototype.toSpeciesString = function () {    // Достъпваме прототипа на получения клас и добавяме метод
        return `I am a ${this.species}. ${this.toString()}`;   // Който ни връща посоченото пропърти на класа и неговия метод toString 
    };
}
