function createSortedList(){

    class Sorted {
        constructor(){
            this.element = []
            this.size = 0
        }

        add(num) {
            this.element.push(num)
            this.size++
            return this.element.sort((a, b) => a - b)
        }

        remove(index){
            if (index >= 0 && index < this.element.length){
                this.element.splice(index, 1)
                this.size--
            }
            return this.element.sort((a, b) => a - b)
        }

        get(index){
            if (index >= 0 && index < this.element.length){
               return this.element[index]
            }
        }

    }
    return new Sorted
}
            
let list = createSortedList();
list.add(5);
list.add(6);
list.add(7); 
console.log(list.get(1)); 
list.remove(1); 
console.log(list.get(1));
console.log(list.size)
list.remove(0)
console.log(list.get(0));
console.log(list.size)
list.add(10)
list.add(20)
list.add(80)
console.log(list.get(0))