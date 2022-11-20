let url = "http://localhost:3030/jsonstore/advanced/table";

export function getAllStudents() {
    return fetch(url).then((response) => response.json());
}
