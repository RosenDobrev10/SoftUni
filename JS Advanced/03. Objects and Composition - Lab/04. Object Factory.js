function objectFactory(lib, list) {

    const result = [];

    for (let order of list) {
        
        const object = {};
        const template = order.template;
        for (let prop in template) {
            object[prop] = template[prop];
        }

        const parts = order.parts;
        for (let part of parts) {
            object[part] = lib[part];
        }

        result.push(object);
    }

    return result;
}

const library = {
    print: function () {
        console.log(`${this.name} is printing a page`);
    },

    scan: function () {
        console.log(`${this.name} is scanning a document`);
    },

    play: function (artist, track) {
        console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
};

const orders = [
    {
        template: { name: "ACME Printer" },
        parts: ["print"],
    },

    {
        template: { name: "Initech Scanner" },
        parts: ["scan"],
    },

    {
        template: { name: "ComTron Copier" },
        parts: ["scan", "print"],
    },

    {
        template: { name: "BoomBox Stereo" },
        parts: ["play"],
    },
];

const products = objectFactory(library, orders);
console.log(products);
