function suppliesForSchool(input) {
    let pens = 5.8;
    let markers = 7.2;
    let Preparat = 1.2;
    let pensAmount = input[0];
    let markersAmount = input[1];
    let PreparatLiter = input[2];
    let discount = input[3] / 100;
    let sumPens = pens * pensAmount;
    let sumMarkers = markers * markersAmount;
    let sumPreparat = Preparat * PreparatLiter;
    let allsum = sumPens + sumMarkers + sumPreparat;
    let finaldiscount = allsum * discount;
    let finalsum = allsum - finaldiscount;
    console.log(finalsum);
}

suppliesForSchool([2, 3, 4, 25]);
