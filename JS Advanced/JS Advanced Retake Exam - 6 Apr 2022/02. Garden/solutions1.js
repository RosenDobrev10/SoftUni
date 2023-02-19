class Garden {
    constructor(spaceAvailable) {
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];
    }

    addPlant(plantName, spaceRequired) {
        if (this.spaceAvailable < spaceRequired) {
            throw new Error('Not enough space in the garden.');
        }
        this.plants.push({ plantName, spaceRequired, ripe: false, quantity: 0 });
        this.spaceAvailable -= spaceRequired;
        return `The ${plantName} has been successfully planted in the garden.`;
    }

    ripenPlant(plantName, quantity) {
        const foundPlant = this.plants.find((plant) => plant.plantName === plantName);
        if (!foundPlant) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (foundPlant.ripe) {
            throw new Error(`The ${plantName} is already ripe.`);
        }
        if (quantity <= 0) {
            throw new Error('The quantity cannot be zero or negative.');
        }
        foundPlant.ripe = true;
        foundPlant.quantity = quantity;
        if (quantity === 1) {
            return `${quantity} ${plantName} has successfully ripened.`;
        }
        return `${quantity} ${plantName}s have successfully ripened.`;
    }

    harvestPlant(plantName) {
        const foundPlant = this.plants.find((plant) => plant.plantName === plantName);
        const foundPlantIndex = this.plants.findIndex((plant) => plant.plantName === plantName);
        if (!foundPlant) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (!foundPlant.ripe) {
            throw new Error(`The ${plantName} cannot be harvested before it is ripe.`);
        }
        this.plants.splice(foundPlantIndex, 1);
        this.storage.push({ plantName, quantity: foundPlant.quantity });
        this.spaceAvailable += foundPlant.spaceRequired;
        return `The ${plantName} has been successfully harvested.`;
    }

    generateReport() {
        let result = [`The garden has ${this.spaceAvailable} free space left.`];
        const sortedPlants = this.plants.sort((a, b) => a.plantName.localeCompare(b.plantName));
        result.push(`Plants in the garden: ${sortedPlants.map((p) => p.plantName).join(', ')}`);
        if (this.storage.length === 0) {
            result.push('Plants in storage: The storage is empty.');
        } else {
            result.push(`Plants in storage: ${this.storage.map((p) => `${p.plantName} (${p.quantity})`).join(', ')}`);
        }
        return result.join('\n');
    }
}
