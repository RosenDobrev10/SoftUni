function attachEventsListeners() {

    let daysBtn = document.getElementById("daysBtn");       // Намираме бутона за конвертиране на дните
    let hoursBtn = document.getElementById("hoursBtn");     // Намираме бутона за конвертиране на часовете
    let minutesBtn = document.getElementById("minutesBtn"); // Намираме бутона за конвертиране на минутите
    let secondsBtn = document.getElementById("secondsBtn"); // Намираме бутона за конвертиране на секундите
    let days = document.getElementById("days");             // Намираме полето за въвеждане на дните
    let hours = document.getElementById("hours");           // Намираме полето за въвеждане на часовете
    let minutes = document.getElementById("minutes");       // Намираме полето за въвеждане на минутите
    let seconds = document.getElementById("seconds");       // Намираме полето за въвеждане на секундите

    let ratios = {                                          // Изваждаме си в обект, мерните единици за 1 ден
        days: 1,
        hours: 24,
        minutes: 1440,
        seconds: 86400,
    };

    daysBtn.addEventListener("click", onConvert);       // Добавяме слушател за бутона за конвертиране на дните
    hoursBtn.addEventListener("click", onConvert);      // Добавяме слушател за бутона за конвертиране на часовете
    minutesBtn.addEventListener("click", onConvert);    // Добавяме слушател за бутона за конвертиране на минутите
    secondsBtn.addEventListener("click", onConvert);    // Добавяме слушател за бутона за конвертиране на секундите

    function convert(value, unit) {     // Създаваме функция, която ще конвертира при подадена стойност и мерна единица
        let days = value / ratios[unit]; // Превръщаме подадената стойност в дни като я делим на мерната единица взета от обекта
        return {                                // Връщаме резултат от функцията
            days: days,                         // Дните са си дни
            hours: days * ratios.hours,         // Часовете са получените дни умножени по часовета от обекта
            minutes: days * ratios.minutes,     // Минутите са получените дни умножени по минутите от обекта
            seconds: days * ratios.seconds,     // Секундите са получените дни умножени по секунди от обекта
        };
    }

    function onConvert(event) {             // Функцията ни получава аргумент event
        let input = event.target.parentElement.querySelector('input[type="text"]');
        // Намираме кой бутон е натиснат с таргет, взимаме неговия родител и от там избираме полето с тип текст 
        let time = convert(Number(input.value), input.id);  
        // Времето е равно на изпълнената функция, с подадена цифра от инпут полето и мерната единица 
        days.value = time.days;         // в инпут полето за дните сетваме да е равно на полученото време в дни 
        hours.value = time.hours;       // в инпут полето за часовете сетваме да е равно на полученото време в часове
        minutes.value = time.minutes;   // в инпут полето за минутите сетваме да е равно на полученото време в минути
        seconds.value = time.seconds;   // в инпут полето за секундите сетваме да е равно на полученото време в секунди
    }
}
