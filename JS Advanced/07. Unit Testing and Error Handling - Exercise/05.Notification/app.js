function notify(message) {

  const divElement = document.getElementById("notification");   // Намираме div елемента с id notification 
  divElement.textContent = message;                             // Съдържанието му го сетваме да е равно на подадения ни message 
  divElement.style.display = "block";                           // Казваме му да се покаже съобщението 

  divElement.addEventListener("click", () => {                // Закачаме слушател на div елемента и при click събитие, изпълняваме
    divElement.style.display = "none";                        // Ако съобщението се натисне му казваме да се скрие 
  });
}
