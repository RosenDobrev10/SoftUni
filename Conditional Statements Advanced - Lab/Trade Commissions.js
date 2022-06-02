function tradeComissions(input) {
    let town = input[0];
    let sales = Number(input[1]);

    if (town === "Sofia" && sales >= 0 && sales <= 500) {
        console.log(((sales * 5) / 100).toFixed(2));
    } else if (town === "Sofia" && sales > 500 && sales <= 1000) {
        console.log(((sales * 7) / 100).toFixed(2));
    } else if (town === "Sofia" && sales > 1000 && sales <= 10000) {
        console.log(((sales * 8) / 100).toFixed(2));
    } else if (town === "Sofia" && sales > 10000) {
        console.log(((sales * 12) / 100).toFixed(2));
    } else if (town === "Varna" && sales >= 0 && sales <= 500) {
        console.log(((sales * 4.5) / 100).toFixed(2));
    } else if (town === "Varna" && sales > 500 && sales <= 1000) {
        console.log(((sales * 7.5) / 100).toFixed(2));
    } else if (town === "Varna" && sales > 1000 && sales <= 10000) {
        console.log(((sales * 10) / 100).toFixed(2));
    } else if (town === "Varna" && sales > 10000) {
        console.log(((sales * 13) / 100).toFixed(2));
    } else if (town === "Plovdiv" && sales >= 0 && sales <= 500) {
        console.log(((sales * 5.5) / 100).toFixed(2));
    } else if (town === "Plovdiv" && sales > 500 && sales <= 1000) {
        console.log(((sales * 8) / 100).toFixed(2));
    } else if (town === "Plovdiv" && sales > 1000 && sales <= 10000) {
        console.log(((sales * 12) / 100).toFixed(2));
    } else if (town === "Plovdiv" && sales > 10000) {
        console.log(((sales * 14.5) / 100).toFixed(2));
    } else {
        console.log("error");
    }
}
tradeComissions(["Sofia", "1500"]);
