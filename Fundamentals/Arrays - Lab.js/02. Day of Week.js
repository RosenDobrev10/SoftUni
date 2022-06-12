function dayOfWeek(day) {

    if (day >= 1 && day <= 7) {  // Проверяваме дали индекса попада в създадения от нас масив.
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",]; 
        let index = day - 1;   // Изчисляваме индекса от масива според числото, което е дадено.
        console.log(days[index]);
    } else {
        console.log("Invalid day!");
    }
}
dayOfWeek(3);
dayOfWeek(6);
dayOfWeek(11);
