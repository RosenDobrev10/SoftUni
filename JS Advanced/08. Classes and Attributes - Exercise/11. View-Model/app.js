class Textbox {
    constructor(selector, regex) {
        this._value = "";
        this._elements = Array.from(document.querySelectorAll(selector));
        this._invalidSymbols = regex;
    }

    get value() {
        return this._value;
    }

    set value(param) {
        this._value = param;

        for (let index = 0; index < this._elements.length; index++) {
            this._elements[index].value = param;
        }
    }

    get elements() {
        return this._elements;
    }

    isValid() {
        return !this._invalidSymbols.test(this.value);
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName(".textbox");

inputs.addEventListener("click", function () {console.log(textbox.value);});
