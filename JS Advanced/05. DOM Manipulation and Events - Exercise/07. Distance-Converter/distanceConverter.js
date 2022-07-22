function attachEventsListeners() {

    let buttonConvert = document.getElementById("convert");     // Намираме бутона за конвертиране 
    buttonConvert.addEventListener("click", onClick);           // Закачаме му слушател 

    let metricUnits = {                                         // Правим обект с мерните единици от гледна точка на 1 метър 
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    function onClick(event) {
        let fromValue = document.getElementById("inputUnits").value;    // Намираме полето за въвеждане на стойност 
        let toValue = document.getElementById("outputUnits").value;     // Намираме полето за показване на конвертираната стойност

        let inputDistance = Number(document.getElementById("inputDistance").value); // Взимаме стойноста въведена за конвертиране 
        let outputDistanceElement = document.getElementById("outputDistance");      
        // Намираме елемента за извеждане на конвертираната стойност

        let valueInMeters = inputDistance * metricUnits[fromValue];     // Конвертираме първо в метри въведената стойност
        let convertedValue = valueInMeters / metricUnits[toValue];      // После ги делим на мерната единица, която искаме да конвертираме 
        outputDistanceElement.value = convertedValue;                   // Задаваме стойност на полето да е равно на конвертираното 
    }
}
