export function addSubmitListener(form, callback) {
    form.addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        callback(data);
    }
}