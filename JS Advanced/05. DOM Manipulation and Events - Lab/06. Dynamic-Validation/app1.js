function validate() {
    const inputField = document.querySelector('#email');
    inputField.addEventListener('change', onChange);
    function onChange(e) {
        const pattern = /[a-z]+@[a-z]+\.[a-z]+/g;
        if (pattern.test(e.target.value)) {
            e.target.classList.remove('error');
        } else {
            e.target.classList.add('error');
        }
    }
}
