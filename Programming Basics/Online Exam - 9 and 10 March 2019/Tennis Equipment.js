function tennisEquipment(input) {
    let priceRacket = input[0];
    let numberRackets = input[1];
    let numberSneakers = input[2];
    let priceSneakers = (1 / 6) * priceRacket;
    let moneyRacketsSneakers = numberRackets * priceRacket + numberSneakers * priceSneakers;
    let equipment = 0.2 * moneyRacketsSneakers;
    let moneyDjokovic = (1 / 8) * (moneyRacketsSneakers + equipment);
    let moneySponsors = (7 / 8) * (moneyRacketsSneakers + equipment);
    console.log(`Price to be paid by Djokovic ${Math.floor(moneyDjokovic)}`);
    console.log(`Price to be paid by sponsors ${Math.ceil(moneySponsors)}`);
}
tennisEquipment([850, 4, 2]);
