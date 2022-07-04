function dayOfWeek(string) {
    
    if (string === "Monday") {
        console.log(1);
    } else if (string === "Tuesday") {
        console.log(2);
    } else if (string === "Wednesday") {
        console.log(3);
    } else if (string === "Thursday") {
        console.log(4);
    } else if (string === "Friday") {
        console.log(5);
    } else if (string === "Saturday") {
        console.log(6);
    } else if (string === "Sunday") {
        console.log(7);
    } else {
        console.log("error");
    }
}
dayOfWeek("Monday");
dayOfWeek("Friday");
dayOfWeek("Invalid");
