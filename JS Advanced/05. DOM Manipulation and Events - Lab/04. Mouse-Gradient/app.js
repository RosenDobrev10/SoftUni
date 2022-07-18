function attachGradientEvents() {

    const gradient = document.getElementById("gradient");   // Намираме позицията на полето с градиента 
    gradient.addEventListener("mousemove", onMouseOver);// Добавяме слушател при мърдане на мишката в полето да се изпълнява ф-я 
    const result = document.getElementById("result");   // Намираме полето с id result 

    function onMouseOver(event) {                        // Създаваме функция за мърдането на мишката в градиента 
        result.textContent = Math.floor((event.offsetX / gradient.clientWidth) * 100) + "%";
        // Променяме съдържанието на дива с id reuslt, да е закръглен надолу, отстоянието от началото делено на цялото разстояние
        // на градиента умножено по 100 да е в проценти и долепяме накрая един % 
    }
}
