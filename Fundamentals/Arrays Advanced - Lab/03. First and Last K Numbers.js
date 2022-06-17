function firstAndLastKNumbers(array) {

  let k = array.shift();      // Взимаме първия елемент от масива, който ще е наш параметър за slice и модифицираме масива 
  let first = array.slice(0, k);    // Първите ни числа, ще започват от началото на масива до K-елемент
  let last = array.slice(-k);   // Подавайки отрицателно число, броим от края на масива до стойността на числото  
                                // и взимаме тези елементи в този отрязък 
  console.log(first.join(" "));
  console.log(last.join(" "));
}
//firstAndLastKNumbers([2, 7, 8, 9])
firstAndLastKNumbers([3, 6, 7, 8, 9]);
