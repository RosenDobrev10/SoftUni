function calculator() {

    let num1 = null;    // Сетваме първоначални стойности на трите полета 
    let num2 = null;
    let result = null;

    return {            // Връщаме като резултат изпълнението на функциите 
        init,
        add,
        subtract,
    };

    function init(selector1, selector2, resultSelector) {   
        num1 = document.querySelector(selector1);           // Намираме полето за първото число 
        num2 = document.querySelector(selector2);           // Намираме полето за второто число
        result = document.querySelector(resultSelector);    // Намираме полето за резултата 
    }

    function add() {
        result.value = Number(num1.value) + Number(num2.value);     // на полето с резултата му даваме стойност равна на сбора 
    }

    function subtract() {
        result.value = Number(num1.value) - Number(num2.value);     // на полето с резултата му даваме стойност равна на изваждането
    }
}
