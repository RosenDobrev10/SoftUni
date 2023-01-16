1function focused() {
    const inputFields = document.querySelectorAll('input');
    for (let input of inputFields) {
        input.addEventListener('focus', onFocus);
        input.addEventListener('blur', onBlur)
    }
    function onFocus(e) {
        e.target.parentElement.classList.add('focused');
    }
    function onBlur(e) {
        e.target.parentElement.classList.remove('focused');
    }
}
