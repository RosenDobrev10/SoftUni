function tradeComissions(input) {
    let town = input[0];
    let sales = Number(input[1]);
    let percent = 0.0;
    switch (town) {
        case "Sofia":
            if (sales >= 0 && sales <= 500) {
                percent = 5 / 100;
            } else if (sales > 500 && sales <= 1000) {
                percent = 7 / 100;
            } else if (sales > 1000 && sales <= 10000) {
                percent = 8 / 100;
            } else if (sales > 10000) {
                percent = 12 / 100;
            }
            break;
        case "Varna":
            if (sales >= 0 && sales <= 500) {
                percent = 4.5 / 100;
            } else if (sales > 500 && sales <= 1000) {
                percent = 7.5 / 100;
            } else if (sales > 1000 && sales <= 10000) {
                percent = 10 / 100;
            } else if (sales > 10000) {
                percent = 13 / 100;
            }
            break;
        case "Plovdiv":
            if (sales >= 0 && sales <= 500) {
                percent = 5.5 / 100;
            } else if (sales > 500 && sales <= 1000) {
                percent = 8 / 100;
            } else if (sales > 1000 && sales <= 10000) {
                percent = 12 / 100;
            } else if (sales > 10000) {
                percent = 14.5 / 100;
            }
            break;
    }
    if (
        (town !== "Sofia" && town !== "Varna" && town !== "Plovdiv") ||
        sales < 0
    ) {
        console.log("error");
    } else {
        console.log((sales * percent).toFixed(2));
    }
}
tradeComissions(["Sofia", "1500"]);
