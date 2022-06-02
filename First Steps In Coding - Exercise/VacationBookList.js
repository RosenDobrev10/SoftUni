function vacationBookList(input) {
    let pages = Number(input[0]);
    let pagesHour = Number(input[1]);
    let days = Number(input[2]);
    let Hours = pages / pagesHour;
    let final = Hours / days;
    console.log(final);
}
vacationBookList(["212", "20", "2"]);
