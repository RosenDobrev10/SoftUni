function cityTaxes(name, population, treasury) {

    const city = {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes() {
            this.treasury += Math.floor(this.population * this.taxRate);
        },
        applyGrowth(percentage) {
            this.population += Math.floor((this.population * percentage) / 100);
        },
        applyRecession(percentage) {
            this.treasury -= Math.floor((this.treasury * percentage) / 100);
        },
    };

    return city;
}
cityTaxes("Tortuga", 7000, 15000);
