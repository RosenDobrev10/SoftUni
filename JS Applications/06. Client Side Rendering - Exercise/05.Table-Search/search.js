export function search() {
    let tableRows = document.querySelector(".container tbody").children;
    let input = document.querySelector("#searchField");
    let searchTerm = input.value;
    input.value = "";

    for (const row of tableRows) {
        row.classList.remove("select");

        if (row.textContent.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            row.classList.add("select");
        }
    }
}
